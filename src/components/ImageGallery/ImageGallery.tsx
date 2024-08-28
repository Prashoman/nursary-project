
import PhotoGallerySVg from '../svg/PhotoGallerySVg';

const ImageGallery = () => {
    return (
        <div className="w-full  bg-green-950 opacity-85 px-4 lg:px-20">
        <h1 className="text-center text-xl lg:text-3xl text-[#F2BA66] pt-5">Presentation</h1>
        <h1 className="text-center text-2xl lg:text-4xl text-white pt-5">Our Photo Gallery</h1>
        <PhotoGallerySVg/>
        <div className="max-w-screen-2xl mx-auto px-4 py-6  relative">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-1 flex-col  border-[5px] border-yellow-700">
                <img
                  className="object-cover h-full"
                  src="https://i.ibb.co/R6wFMd1/close-up-transplanting-process-plants-23-2149080685.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-row gap-2">
                <div className="flex flex-1 flex-col  border-[5px] border-yellow-700">
                  <img
                    className="object-cover h-full"
                    src="https://i.ibb.co/gSVztkM/side-view-woman-checking-plant-23-2149456988.jpg"
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col  border-[5px] border-yellow-700">
                  <img
                    className="object-cover h-full"
                    src="https://i.ibb.co/VMhRdvV/kids-learnign-about-environment-23-2149176611.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-1 flex-row gap-2">
                <div className="flex flex-1 flex-col  border-[5px] border-yellow-700">
                  <img
                    className="object-cover h-full"
                    src="https://i.ibb.co/zmj9nZM/greenhouse-still-life.jpg"
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col  border-[5px] border-yellow-700">
                  <img
                    className="object-cover h-full"
                    src="https://i.ibb.co/mHs118n/side-view-childrens-watering-flower.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col  border-[5px] border-yellow-700">
                <img
                  className="object-cover h-full"
                  src='https://i.ibb.co/PcF3F69/gardening.jpg'
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rotate-180 pb-9">
        <PhotoGallerySVg/>
        </div>
      </div>
    );
};

export default ImageGallery;