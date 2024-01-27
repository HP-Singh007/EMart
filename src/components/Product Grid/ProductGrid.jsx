import React,{ useContext, useEffect, useState, useRef} from 'react'
import "../../styles/ProductGrid.css"
import ProductCard from './ProductCard'
import axios from 'axios'
import {server,Context} from '../../index'
import Pagination from 'react-bootstrap/Pagination';
import Searchbox from './Searchbox'
import notFound from '../../images/404.png'

const ProductGrid = ({setCategory,category,rating,Uprice,Lprice,page,setPage}) => {
  const [products,setProducts] = useState([]);
  const [pages,setPages] = useState(1);
  const [keyword,setKeyword] = useState('');
  const [Item,setItem]=useState([]);
  const {setIsLoading} = useContext(Context);
  const myRef = useRef();
  
  const pagination=()=>{
    const items=[];
    for(let i=1;i<=pages;i++){
      items.push(i)
    }
    setItem(items);
  }

  const paginationHandler=(page)=>{
    setPage(page);
    myRef.current.scrollIntoView({behaviour:'smooth'});
  }

  const params= category==='All'?{
    keyword:`${keyword}`,
    "rating[gte]":`${rating}`,
    "price[lte]":`${Uprice}`,
    "price[gte]":`${Lprice}`,
    "page":`${page}`
  }:{
    keyword:`${keyword}`,
    category:`${category}`,
    "rating[gte]":`${rating}`,
    "price[lte]":`${Uprice}`,
    "price[gte]":`${Lprice}`,
    "page":`${page}`
  }

  useEffect(()=>{
    // setIsLoading(true);
    axios.get(`${server}/products`,{
      params,
      withCredentials:true,
    })
    .then((res)=>{
      setProducts(res.data.product);
      setPages(Math.ceil(res.data.totalProducts/12));
      pagination();
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 500);
    })
    .catch((error)=>{
      console.log(error);
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 500);
    },)
  },[page,pages,keyword,category,rating,Uprice,Lprice])

  return (
    <div className='productgrid' ref={myRef}>
      <Searchbox setKeyword={setKeyword} setPage={setPage} setCategory={setCategory}/>
      {
        products.length>0?(
          <>
            <div id="grid">
              {products.map((i)=>{
                return <ProductCard productId={`/products/${i._id}`} name={i.name} price={i.price} discount={i.discount} rating={i.rating} image={i.images.length?i.images[0].url:null}/>
              })}
            </div>
            <Pagination id='pagination' size='lg'>{
              Item.map((i)=>{
                return <Pagination.Item key={i} onClick={()=>paginationHandler(i)} active={i===page}>{i}</Pagination.Item>
              })
            }</Pagination> 
          </> 
        ):(
          <div id='emptyGrid'>
            <img src={notFound} alt="Not Found" />
            <p>No Matching Product Found</p>
            <Pagination id='pagination' size='lg'>{
              Item.map((i)=>{
                return <Pagination.Item key={i} onClick={()=>paginationHandler(i)} active={i===page}>{i}</Pagination.Item>
              })
            }</Pagination> 
          </div>
        )
      }
      
    </div>
  )
}

export default ProductGrid
