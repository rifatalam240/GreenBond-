import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 💡 autoplay এর জন্য আলাদা CSS লাগে না

const BannerSlider = () => {
  const slides = [
    {
      image: "https://i.ibb.co/JjzdL7Qq/istockphoto-1148009613-612x612.jpg",
      title: "Spring Greenhouse Workshop",
      description: "Learn to build and maintain your own sustainable garden.",
      button: "Join Now",
    },
    {
      image: "https://i.ibb.co/TB3WDwKt/istockphoto-1225394970-1024x1024.jpg",
      title: "Planting for Beginners",
      description: "Hands-on sessions for planting and caring for plants.",
      button: "Get Started",
    },
    {
      image: "https://i.ibb.co/JWn9dPDj/download.jpg",
      title: "Community Gardening Meetup",
      description: "Connect with nature lovers and grow together.",
      button: "Explore More",
    },
  ];

  return (
    <div className="w-full ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-[450px] md:h-[550px] rounded-2xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="h-full w-full bg-cover bg-center flex items-center justify-center text-white relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* 👇 হালকা ব্ল্যাক background চাইলে এটা রাখো (opacity কমানো হয়েছে) */}
              <div className="absolute inset-0 bg-opacity-20"></div>

              {/* 👇 টেক্সট এলিমেন্টস */}
              <div className="relative z-10 text-center max-w-2xl px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                {/* <button className="bg-green-600 hover:bg-green-700 px-6 py-2 text-white rounded-md shadow-md transition">
                  {slide.button}
                </button> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
