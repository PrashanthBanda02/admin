import {useState} from 'react'
import './index.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(false)

    const [productDetails, setProductDetails] = useState({
        name:'',
        image:'',
        category:'women',
        new_price:'',
        old_price:''
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const addProduct = async()=>{
        console.log(productDetails)
        let responseData ;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);
        
        await fetch('http://localhost:4000/upload',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
            },
            body: formData
        }).then((resp)=> resp.json()).then((data)=>{responseData = data})

        if(responseData.success)
        {
            product.image = responseData.image_url
            console.log(product)

            await fetch('http://localhost:4000/addproduct',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(product)
            }).then((resp)=> resp.json()).then((data)=>{
                data.success ? alert('Product Added' ): alert('Failed')
        })
        }

    } 
    
  return (
    <div className='add-product'>
        <div className='add-product-item-field'>
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
        </div>
        <div className='add-product-price'>
            <div className='add-product-item-field'>
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
            </div>
            <div className='add-product-item-field'>
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
            </div>
        </div>
        <div className='add-product-item-field'>
                <p>Product category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value='women'>Women</option>
                    <option value='men'>Men</option>
                    <option value='kids'>Kids</option>   
                </select>
            </div>
            <div className='add-product-item-field'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image):upload_area} className='add-product-thumbnail-img' alt='img' />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={()=>{addProduct()}} className='add-product-btn'>ADD</button>
    </div>
  )
}
export default AddProduct
