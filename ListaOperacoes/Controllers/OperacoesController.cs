using ListaOperacoes.Data;
using ListaOperacoes.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ListaOperacoes.Controllers
{
    public class OperacoesController : ApiController
    {
        [HttpGet]
        [ActionName("GetListaOperacoes")]
        public IEnumerable<Operacao> GetListaOperacoes()
        {
            using (ListasOperacoesEntities entities = new ListasOperacoesEntities())
            {
                try
                {
                    var result = (from op in entities.Operacoes
                                  join tipo_negocio in entities.TiposNegocio on op.TipoNegocio equals tipo_negocio.CodigoTipoNegocio
                                  select new Operacao()
                                  {
                                      CodigoOperacao = op.CodigoOperacao,
                                      NomeOperacao = op.NomeOperacao,
                                      //Preco = op.Preco,
                                      //Quantidade = op.Quantidade,
                                      //TipoMercadoria = op.TipoMercadoria,
                                      //NomeMercadoria = op.NomeMercadoria,
                                      //TipoNegocio = new TipoNegocio()
                                      //{
                                      //    CodigoTipoNegocio = tipo_negocio.CodigoTipoNegocio,
                                      //    NomeTipoNegocio = tipo_negocio.NomeTipoNegocio
                                      //}
                                  }).ToList();

                    return result;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

            }
        }

        [HttpGet]
        [ActionName("GetOperacao")]
        public Operacao GetOperacao([FromUri] int CodigoOperacao)
        {
            using (ListasOperacoesEntities entities = new ListasOperacoesEntities())
            {
                try
                {

                    var result = (from op in entities.Operacoes
                                  join tipo_negocio in entities.TiposNegocio on op.TipoNegocio equals tipo_negocio.CodigoTipoNegocio
                                  where op.CodigoOperacao == CodigoOperacao
                                  select new Operacao()
                                  {
                                      CodigoOperacao = op.CodigoOperacao,
                                      NomeOperacao = op.NomeOperacao,
                                      Preco = op.Preco,
                                      Quantidade = op.Quantidade,
                                      TipoMercadoria = op.TipoMercadoria,
                                      NomeMercadoria = op.NomeMercadoria,
                                      TipoNegocio = new TipoNegocio()
                                      {
                                          CodigoTipoNegocio = tipo_negocio.CodigoTipoNegocio,
                                          NomeTipoNegocio = tipo_negocio.NomeTipoNegocio
                                      }
                                  }).FirstOrDefault();

                    return result ?? new Operacao() { CodigoOperacao = 0, NomeMercadoria = "", NomeOperacao = "Nova Operação", Preco = 0, Quantidade = 0, TipoMercadoria = "", TipoNegocio = new TipoNegocio() { CodigoTipoNegocio = 0, NomeTipoNegocio = "" } };
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

            }
        } 

  
        [HttpPost]
        [ActionName("AdicionarOperacao")]
        public void AdicionarOperacao([FromBody] Operacao request)
        {
            using (ListasOperacoesEntities entities = new ListasOperacoesEntities())
            {
                try
                {
                    if (request == null)
                    {
                        throw new ArgumentNullException("Invalid request, parameter is null !");
                    }

                    var insert = (from tipo_negocio in entities.TiposNegocio
                                        .Where(x => x.NomeTipoNegocio == request.TipoNegocio.NomeTipoNegocio)
                                  select new
                                  {
                                      tipo_negocio
                                  }).AsEnumerable().Select(x => new Operacoes()
                                  {
                                      NomeOperacao = request.NomeOperacao,
                                      Preco = request.Preco,
                                      Quantidade = request.Quantidade,
                                      NomeMercadoria = request.NomeMercadoria,
                                      TipoMercadoria = request.TipoMercadoria,
                                      TipoNegocio = x.tipo_negocio.CodigoTipoNegocio
                                  }).FirstOrDefault();
                    
                    entities.Operacoes.Add(insert);
                    entities.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        [HttpPost]
        [ActionName("AlterarOperacao")]
        public void AlterarOperacao([FromBody] Operacao request)
        {
            using (ListasOperacoesEntities entities = new ListasOperacoesEntities())
            {
                try
                {
                    if (request == null)
                    {
                        throw new ArgumentNullException("Invalid request, parameter is null !");
                    }

                    (from op in entities.Operacoes
                     from tipo_negocio in entities.TiposNegocio
                         .Where(x => x.NomeTipoNegocio == request.TipoNegocio.NomeTipoNegocio).DefaultIfEmpty()
                     where op.CodigoOperacao == request.CodigoOperacao
                     select new
                     {
                         op,
                         tipo_negocio
                     }).ToList().ForEach(x =>
                     {
                         x.op.NomeOperacao = request.NomeOperacao;
                         x.op.Preco = request.Preco;
                         x.op.Quantidade = request.Quantidade;
                         x.op.NomeMercadoria = request.NomeMercadoria;
                         x.op.TipoMercadoria = request.TipoMercadoria;
                         x.op.TipoNegocio = x.tipo_negocio.CodigoTipoNegocio;
                     });



                    entities.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        [HttpPost]
        [ActionName("ExcluirOperacao")]
        public void ExcluirOperacao([FromBody] Operacao request)
        {
            using (ListasOperacoesEntities entities = new ListasOperacoesEntities())
            {
                try
                {
                    if (request == null)
                    {
                        throw new ArgumentNullException("Invalid request, parameter is null !");
                    }

                    var delete = (from op in entities.Operacoes
                                  where op.CodigoOperacao == request.CodigoOperacao
                                  select op).FirstOrDefault();

                    entities.Operacoes.Remove(delete);
                    entities.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
    }
}
