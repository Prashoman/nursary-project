import DiscoverSVG from "../svg/DiscoverSVG";


const TitleFormet = (props:any) => {
    return (
        <div className="px-4 lg:px-20">
            <h1 className="text-center text-xl lg:text-3xl text-[#F2BA66] pt-5">{props.title}</h1>
            <div className="flex items-center justify-center gap-10 py-5">
                <DiscoverSVG/>
                <h1 className="text-xl lg:text-4xl text-green-600 font-light text-center">{props.subTitle}</h1>
                <div className="rotate-180">
                <DiscoverSVG/>
                </div>
            </div>
        </div>
    );
};

export default TitleFormet;