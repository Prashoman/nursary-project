import React from 'react';

import TitleFormet from '../title/TitleFormet';
import { SwiperSlide,Swiper } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay } from "swiper/modules";
import { useGetProductByCategoryQuery } from '../../redux/api/baseApi';
import { Link } from 'react-router-dom';

const RelatedProcuts = ({categoryId}) => {
    // console.log({categoryId});
    
    const {data} = useGetProductByCategoryQuery(categoryId)
    const products = data?.data;
    console.log({data});
    
    return (
        <>
        <TitleFormet title="" subTitle="Related Product" />
            <div className="w-full px-4 lg:px-20">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}


                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        }
                    }}
                    className="mySwiper"
                >
                    {products?.map((item: any, index:number) =>(
                            <SwiperSlide key={index}>
                                <div className="w-full h-full relative">
                                    <img
                                        src={item.image}
                                        alt="placeholder"
                                        className="h-[300px] w-full"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-green-900 p-4 flex items-center justify-center shape-design">
                                        <Link to={`/product/${item?._id}`} className="text-center border border-gray-200 py-1 px-3 rounded-lg text-white mt-5 shadow-xl">
                                            View More
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ) 
                    )}
                </Swiper>
            </div>
            
        </>
    );
};

export default RelatedProcuts;