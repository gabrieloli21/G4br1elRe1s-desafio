import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import api from './api';
import capas from '../components/Capas';
import Link from 'next/link';
import moment from 'moment';

export default function Home() {
  const [catalogo, setCatalogo] = useState([]);

  //requisição dos dados pela api vinda da pasta './api'
  const Lista = async () => {
    const recebe = await api.get('')
      .catch((err) => console.log("Erroooou!", err));

    setCatalogo(recebe.data.results);
  }

  //aqui lista todos os dados vindos função e os colchetes vazios representa que não depende de nenhuma variável executando, assim, apenas uma vez
  useEffect(() => {
    Lista();
  }, []);//

  console.log("Filmes:", catalogo);

  return (

    <div>
      <Head>
        <title>Desafio Mercadou</title>
      </Head>

      <main >
        <div className="areaGeral">
          <h1>Catálogo de filmes</h1>
          <div className="listaFilmeArea">
            <div className="filmesLinha">

              {/* map feito para replicar o array conforme o que foi pedido. 
              No caso, foi passado parâmetros para variável "imagem" receber os posters específicos de cada filme 
              esses posters estão localizados em um arquivo JSON na pasta "components"*/}
              {catalogo.map((a, chave) => {

                const imagem = capas[chave].poster;

                return (

                  <div key={chave} className="filmeLinha--item" >
                    {/* Componente que permite que quando a imagem for clicada, redirecionar para a rota "personagens" */}
                    <Link href="/personagens">
                      <img
                        src={imagem}
                        alt="Poster"
                        width={216}
                        height={324}
                      />
                    </Link>
                    {/* recebendo os valores pelo array resultante do método map
                  moment foi colocado  para traduzir a data  */}
                    <h3>Filme: {a.title} </h3>
                    <h3>Diretor: {a.director}</h3>
                    <h3>Produtor: {a.producer}</h3>
                    <h3>{a.episode_id}º episódio</h3>
                    <h3>Data de lançamento: {moment(a.release_date).format('DD/MM/YYYY')}</h3>

                    <div className="link">
                      {/* componente para colocar rota"personagens" na url e recebe um array com os personagens de cada filme*/}
                      <Link href={{
                        pathname: '/personagens/',
//                         query: { personagens: catalogo[chave].characters },
                      }}>

                        <a className="acesso-personagem">Confira os personagens</a>
                      </Link>
                    </div>

                    {console.log('query:', catalogo[chave].characters)}
                    


                  </div>
                )
              }
                // capas.map((c,key) => c.episode_id == key? {c.poster}
              )
                // )
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}









