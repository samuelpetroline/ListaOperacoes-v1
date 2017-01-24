using ListaOperacoes.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ListaOperacoes.Controllers
{
    public class TiposNegocioController : ApiController
    {
        [HttpGet]
        [ActionName("GetTiposNegocio")]
        public IEnumerable<TipoNegocio> GetTiposNegocio()
        {
            using (ListasOperacoesEntities entities = new ListasOperacoesEntities())
            {
                try
                {
                    var result = (from tipo_negocio in entities.TiposNegocio
                                  select new TipoNegocio()
                                  {
                                      CodigoTipoNegocio = tipo_negocio.CodigoTipoNegocio,
                                      NomeTipoNegocio = tipo_negocio.NomeTipoNegocio
                                  }).ToList();

                    return result;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
    }
}
