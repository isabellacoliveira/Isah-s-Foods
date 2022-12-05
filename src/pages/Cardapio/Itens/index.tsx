import cardapio from './itens.json';
import Item from './Item';  
import styles from './Itens.module.scss'; 
import {useState, useEffect} from 'react'; 

interface Props {
    busca: string, 
    filtro: number | null,
    ordenador: string;
}

export default function Itens(props: Props){
    const [lista, setLista] = useState(cardapio); 
    const { busca, filtro, ordenador } = props; 

    function testaBusca(title: string){
        const regex = new RegExp(busca, 'i'); 
        return regex.test(title)
    }

    function testaFiltro(id: number){
        if(filtro !== null) return filtro === id; 
        return true 
    }

    // o type of diz que é um array 
    function ordenar(novaLista: typeof cardapio){
        // de acordo com cada ordenador , vamos ordenar de um jeito 
        switch(ordenador){
            case 'porcao': 
            // o sort pede 2 parametros a e b 
            // se a.size for maior que b.size 
                return novaLista.sort((a, b) => a.size > b.size ? 1 : -1)
            case 'qtd_pessoas':
                return novaLista.sort((a, b) => a.serving > b.serving ? 1 : -1)
            case 'preco': 
                return novaLista.sort((a, b) => a.price > b.price ? 1 : -1)
            default: 
                return novaLista; 
        }
    }

    useEffect(() => {
        const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id))
        // vamos retornar não só a nova lista mas também a função ordenar que vamos criar
        setLista(ordenar(novaLista))
        // sempre que o ordenador mudar , vamos mudar , vamos executar o useEffect 
    }, [busca, filtro, ordenador])

    return(
        <div className={styles.itens}>
            {lista.map(item => (
                    <Item 
                        key={item.id}
                            {...item}
                        />
            ))}
        </div>
    )
}
