import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  criarAdministrador,
  editarAdministrador,
  buscarAdministrador,
} from '../../services/administradorService'
import CampoInput from '../../componentes/CampoInput/CampoInput'
import Botao from '../../componentes/Botao/Botao'
import './Administradores.css'

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validarCPF(cpf: string): boolean {
  const cpfLimpo = cpf.replace(/[.-]/g, '')
  if (cpfLimpo.length !== 11) return false
  if (/^(\d)\1+$/.test(cpfLimpo)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) soma += Number(cpfLimpo[i]) * (10 - i)
  let d1 = (soma * 10) % 11
  if (d1 === 10 || d1 === 11) d1 = 0
  if (d1 !== Number(cpfLimpo[9])) return false

  soma = 0
  for (let i = 0; i < 10; i++) soma += Number(cpfLimpo[i]) * (11 - i)
  let d2 = (soma * 10) % 11
  if (d2 === 10 || d2 === 11) d2 = 0
  return d2 === Number(cpfLimpo[10])
}

function validarSenha(senha: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha)
}

function formatarCPF(valor: string): string {
  return valor
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export default function AdministradorForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const editando = !!id

  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  })

  const [erros, setErros] = useState<Record<string, string>>({})
  const [erroApi, setErroApi] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (editando) {
      buscarAdministrador(id).then(adm => {
        setForm(prev => ({ ...prev, nome: adm.nome, email: adm.email, cpf: adm.cpf }))
      }).catch(() => setErroApi('Erro ao carregar administrador.'))
    }
  }, [id, editando])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    if (name === 'cpf') {
      setForm(prev => ({ ...prev, cpf: formatarCPF(value) }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
    setErros(prev => ({ ...prev, [name]: '' }))
    setErroApi('')
  }

  function validar(): boolean {
    const novosErros: Record<string, string> = {}

    if (!form.nome.trim()) novosErros.nome = 'Nome é obrigatório.'

    if (!editando) {
      if (!form.email.trim()) {
        novosErros.email = 'E-mail é obrigatório.'
      } else if (!validarEmail(form.email)) {
        novosErros.email = 'E-mail inválido.'
      }
    }

    if (!form.cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório.'
    } else if (!validarCPF(form.cpf)) {
      novosErros.cpf = 'CPF inválido.'
    }

    if (!form.senha) {
      novosErros.senha = 'Senha é obrigatória.'
    } else if (!validarSenha(form.senha)) {
      novosErros.senha = 'A senha deve ter no mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial (@$!%*?&).'
    }

    if (!form.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirme sua senha.'
    } else if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return

    setCarregando(true)
    try {
      if (editando) {
        await editarAdministrador(id, {
          nome: form.nome,
          senha: form.senha,
          cpf: form.cpf.replace(/[^\d]/g, ''),
        })
      } else {
        await criarAdministrador({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
          cpf: form.cpf.replace(/[^\d]/g, ''),
        })
      }
      navigate('/administradores')
    } catch (erro: unknown) {
      if (erro instanceof Error) setErroApi(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="administradores-container">
      <div className="administradores-topo">
        <h1>{editando ? 'Editar administrador' : 'Novo administrador'}</h1>
      </div>

      <div className="administrador-form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="administrador-form-campos">
            <CampoInput label="Nome completo" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} erro={erros.nome} />

            {!editando && (
              <CampoInput label="E-mail" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} erro={erros.email} />
            )}

            <CampoInput label="CPF" name="cpf" placeholder="000.000.000-00" value={form.cpf} onChange={handleChange} erro={erros.cpf} inputMode="numeric" />

            <CampoInput label="Senha" name="senha" type="password" placeholder="Mínimo 8 caracteres" value={form.senha} onChange={handleChange} erro={erros.senha} />

            <CampoInput label="Confirmar senha" name="confirmarSenha" type="password" placeholder="Repita a senha" value={form.confirmarSenha} onChange={handleChange} erro={erros.confirmarSenha} />
          </div>

          {erroApi && <p className="administradores-erro">{erroApi}</p>}

          <div className="administrador-form-acoes">
            <Botao variante="secundario" onClick={() => navigate('/administradores')}>Cancelar</Botao>
            <Botao type="submit" disabled={carregando}>{carregando ? 'Salvando...' : 'Salvar'}</Botao>
          </div>
        </form>
      </div>
    </div>
  )
}