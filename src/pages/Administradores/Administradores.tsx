import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarAdministradores, deletarAdministrador } from '../../services/administradorService'
import { Administrador } from '../../types'
import Paginacao from '../../componentes/Paginacao/Paginacao'
import Modal from '../../componentes/Modal/Modal'
import Botao from '../../componentes/Botao/Botao'
import './Administradores.css'

export default function Administradores() {
  const navigate = useNavigate()

  const [administradores, setAdministradores] = useState<Administrador[]>([])
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [carregando, setCarregando] = useState(false)
  const [erroApi, setErroApi] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [idParaDeletar, setIdParaDeletar] = useState<string | null>(null)

  async function carregar(pagina: number) {
    setCarregando(true)
    setErroApi('')
    try {
      const resposta = await listarAdministradores(pagina)
      setAdministradores(resposta.dados)
      setTotalPaginas(resposta.totalPaginas)
      setPaginaAtual(pagina)
    } catch (erro: unknown) {
      if (erro instanceof Error) setErroApi(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar(1)
  }, [])

  function abrirModal(id: string) {
    setIdParaDeletar(id)
    setModalAberto(true)
  }

  function fecharModal() {
    setIdParaDeletar(null)
    setModalAberto(false)
  }

  async function confirmarDelecao() {
    if (!idParaDeletar) return
    try {
      await deletarAdministrador(idParaDeletar)
      fecharModal()
      carregar(paginaAtual)
    } catch (erro: unknown) {
      if (erro instanceof Error) setErroApi(erro.message)
      fecharModal()
    }
  }

  return (
    <div className="administradores-container">
      <div className="administradores-topo">
        <h1>Administradores</h1>
        <Botao onClick={() => navigate('/administradores/novo')}>Novo administrador</Botao>
      </div>

      {erroApi && <p className="administradores-erro">{erroApi}</p>}

      {carregando ? (
        <p className="administradores-carregando">Carregando...</p>
      ) : (
        <>
          <table className="administradores-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map(adm => (
                <tr key={adm.id}>
                  <td>{adm.nome}</td>
                  <td>{adm.email}</td>
                  <td>{adm.cpf}</td>
                  <td className="acoes">
                    <Botao variante="secundario" onClick={() => navigate(`/administradores/editar/${adm.id}`)}>
                      Editar
                    </Botao>
                    <Botao variante="perigo" onClick={() => abrirModal(adm.id)}>
                      Excluir
                    </Botao>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onMudar={carregar}
          />
        </>
      )}

      {modalAberto && (
        <Modal
          titulo="Excluir administrador"
          mensagem="Tem certeza que deseja excluir este administrador? Esta ação não pode ser desfeita."
          onConfirmar={confirmarDelecao}
          onCancelar={fecharModal}
        />
      )}
    </div>
  )
}