
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
              <div className="flex flex-1 flex-col  border-[5px] border-[#690213]">
                <img
                  className="object-cover h-full"
                  src="https://images.unsplash.com/photo-1664764119004-999a3f80a1b8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjY2NDEzMDc&ixlib=rb-4.0.3&q=80"
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-row gap-2">
                <div className="flex flex-1 flex-col  border-[5px] border-[#690213]">
                  <img
                    className="object-cover h-full"
                    src="https://images.unsplash.com/photo-1664764119004-999a3f80a1b8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjY2NDEzMDc&ixlib=rb-4.0.3&q=80"
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col  border-[5px] border-[#690213]">
                  <img
                    className="object-cover h-full"
                    src="https://images.unsplash.com/photo-1664764119004-999a3f80a1b8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjY2NDEzMDc&ixlib=rb-4.0.3&q=80"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-1 flex-row gap-2">
                <div className="flex flex-1 flex-col  border-[5px] border-[#690213]">
                  <img
                    className="object-cover h-full"
                    src="https://images.unsplash.com/photo-1664764119004-999a3f80a1b8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjY2NDEzMDc&ixlib=rb-4.0.3&q=80"
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col  border-[5px] border-[#690213]">
                  <img
                    className="object-cover h-full"
                    src="https://images.unsplash.com/photo-1664764119004-999a3f80a1b8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjY2NDEzMDc&ixlib=rb-4.0.3&q=80"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col  border-[5px] border-[#690213]">
                <img
                  className="object-cover h-full"
                  src="https://images.unsplash.com/photo-1664764119004-999a3f80a1b8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjY2NDEzMDc&ixlib=rb-4.0.3&q=80"
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