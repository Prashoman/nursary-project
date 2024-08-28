
import WelcomeSVG from '../svg/WelcomeSVG';
import { motion } from "framer-motion";
import SVG from "../../assets/images/flower.svg"

const About = () => {
    return (
        <section className="about-image relative">
        <div className="bg-white opacity-85 w-full h-full px-4 lg:px-24">
          <div>
            <WelcomeSVG />
          </div>

          <h1 className="text-center font-semibold text-orange-400 
          text-xl lg:text-2xl">
            Welcome to
          </h1>
          <h1 className="text-center font-medium text-green-400 text-2xl lg:text-4xl pt-5">
           Our Store
          </h1>
          <p className="text-center justify-center font-xl text-gray-400 leading-6 py-5 text-xs lg:text-[16px]">
          Some nurseries specialize in certain areas, which may include: propagation and the selling of small or bare root plants to other nurseries; growing out plant materials to a saleable size, or retail sales.[4] Nurseries may also specialize in one type of plant, e.g., groundcovers, shade plants, or rock garden plants. Some produce bulk stock, whether seedlings or grafted trees, of particular varieties for purposes such as fruit trees for orchards or timber trees for forestry. Some producers produce stock seasonally, ready in the spring for export to colder regions where propagation could not have been started so early or to regions where seasonal pests prevent profitable growing early in the season.
          </p>
          <div className="rotate-180">
            <WelcomeSVG />
          </div>
        </div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          className="absolute top-[5px] left-[6px] lg:top-5 lg:left-11"
        >
          <img src={SVG} className="w-[50px] h-[50px] lg:w-[150px] lg:h-[150px]"  alt="slide1" />
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "linear",
            }}
            className="absolute top-[12.5px] left-[12.5px] lg:top-[35px] lg:left-[35px] rounded-full"
          >
            <img
              className="rounded-full w-[25px] h-[25px] lg:w-[80px] lg:h-[80px]"
              src="https://i.ibb.co/XkPMKQ3/child-learning-how-plant-tree.jpg"
              alt="slide1"
            />
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          className="absolute right-[15px] bottom-1 lg:bottom-2 lg:right-11"
        >
          <img src={SVG} className="w-[50px] h-[50px] lg:w-[150px] lg:h-[150px]"  alt="slide2" />
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "linear",
            }}
            className="absolute bottom-[12.5px] right-[12.5px] lg:bottom-[35px] lg:right-[35px] rounded-full"
          >
            <img
              className="rounded-full w-[25px] h-[25px] lg:w-[80px] lg:h-[80px]"
              src="https://i.ibb.co/XkPMKQ3/child-learning-how-plant-tree.jpg"
             
              alt="slide1"
            />
          </motion.div>
        </motion.div>
      </section>
    );
};

export default About;