
namespace ListaOperacoes
{
    using System;
    using System.Collections.Generic;
    
    public partial class Operacao
    {
        public int CodigoOperacao { get; set; }
        public string NomeOperacao { get; set; }
        public string  NomeMercadoria { get; set; }
        public TipoNegocio TipoNegocio { get; set; }
        public string TipoMercadoria { get; set; }
        public decimal Quantidade { get; set; }
        public decimal Preco { get; set; }
    }
}
