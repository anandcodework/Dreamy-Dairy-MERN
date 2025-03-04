import React from 'react'
import CategoryList from '../components/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import SliderBar from '../components/SlideBar'

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center">
      
      <SliderBar className="bg-black" />
  

      <CategoryList/>

      

      <HorizontalCardProduct category={"milk"} heading={"Top's Milk Brand"}/>
      <HorizontalCardProduct category={"softdrink"} heading={"Top's SoftDrink Brand"}/>

      <VerticalCardProduct category={"icecream"} heading={"Top's Ice Cream Brand"}/>
    

    </div>
  )
}

export default Home