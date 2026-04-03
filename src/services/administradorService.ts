import requisicao from './api'
import {
  Administrador,
  CriarAdministradorPayload,
  EditarAdministradorPayload,
  PaginacaoResponse,
} from '../types'

export function listarAdministradores(page = 1, limit = 10): Promise<PaginacaoResponse<Administrador>> {
  return requisicao<PaginacaoResponse<Administrador>>(`/administradores?page=${page}&limit=${limit}`)
}

export function buscarAdministrador(id: string): Promise<Administrador> {
  return requisicao<Administrador>(`/administradores/${id}`)
}

export function criarAdministrador(payload: CriarAdministradorPayload): Promise<Administrador> {
  return requisicao<Administrador>('/administradores', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function editarAdministrador(id: string, payload: EditarAdministradorPayload): Promise<Administrador> {
  return requisicao<Administrador>(`/administradores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deletarAdministrador(id: string): Promise<void> {
  return requisicao<void>(`/administradores/${id}`, { method: 'DELETE' })
}