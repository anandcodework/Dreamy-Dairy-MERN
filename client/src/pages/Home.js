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

      

      <HorizontalCardProduct category={"milk"} heading={"Top's Laptop"}/>
      <HorizontalCardProduct category={"graphicscards"} heading={"Popular's Graphics Cards"}/>

      <VerticalCardProduct category={"milk"} heading={"Spaceil Milk"}/>
      <VerticalCardProduct category={"milk"} heading={"Spaceil "}/>
      <VerticalCardProduct category={"milk"} heading={" Milk"}/>
 

    </div>
  )
}

export default Home