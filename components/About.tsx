/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import ParallaxMedia from './ParallaxMedia';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-[#EBE7DE]">

      {/* Introduction / Story */}
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight mb-4">
            Learning from nature.
          </h2>
          <h3 className="text-2xl md:text-3xl font-light text-[#5D5A53]">
            師法自然，構築線條。
          </h3>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <ParallaxMedia
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video"
            alt="LINEA Design Studio - Digital Prototyping"
            className="w-full h-[400px] mb-12"
            mediaClassName="grayscale contrast-[0.9] brightness-110"
            speed={-0.15} // Slower background movement
            scrollScrub={true}
          />
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-6">
            LINEA explores the intersection of architectural discipline and organic freedom. We believe that true beauty lies in the balance between the computed and the chaotic.
          </p>
          <p className="text-base md:text-lg text-[#5D5A53] font-light leading-relaxed mb-8 opacity-80">
            LINEA 探索建築紀律與有機自由的交會點。我們相信，真正的美存在於運算與混沌之間的平衡。
          </p>

          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-6">
            Led by an architect-turned-designer, our studio uses digital tools to mimic the growth patterns of nature. From the spiral of a tornado to the flow of the Milky Way, our objects are not just made; they are grown from lines of code and solidified into quiet, flowing forms.
          </p>
          <p className="text-base md:text-lg text-[#5D5A53] font-light leading-relaxed mb-8 opacity-80">
            由建築師轉型的設計師領軍，我們的工作室運用數位工具模仿自然的生長模式。從龍捲風的螺旋到銀河的流動，我們的物件不只是被「製造」出來，而是從程式碼的線條中「生長」出來，凝固成靜謐、流動的形態。
          </p>


          <p className="text-sm font-medium uppercase tracking-widest text-[#A8A29E] mt-4">
            The Process: Digital Craft / 數位工藝
          </p>
        </div>
      </div>

      {/* Philosophy Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
          <ParallaxMedia
            src="images/flower.mp4"
            type="video"
            poster="images/white-flower.png"
            alt="Optimized white flower blooming animation"
            className="w-full h-full"
            mediaClassName="transition-transform duration-[2s] group-hover:scale-105"
            speed={0.15}
            scrollScrub={true}
          />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#D6D1C7]">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D5A53] mb-6">Philosophy / 哲學</span>
          <h3 className="text-4xl md:text-5xl font-serif mb-2 text-[#2C2A26] leading-tight">
            Flowing Silence.
          </h3>
          <h4 className="text-2xl md:text-3xl font-light text-[#5D5A53] mb-8">
            流動的靜謐
          </h4>
          <p className="text-lg text-[#5D5A53] font-light leading-relaxed mb-6 max-w-md">
            Our designs are characterized by continuous curves and layered surfaces. Like a white canvas, they catch light and shadow, evolving throughout the day.
          </p>
          <p className="text-base text-[#5D5A53] font-light leading-relaxed mb-12 max-w-md opacity-80">
            我們的設計特徵在於連續的曲線與層疊的表面。如同一張白色畫布，它們捕捉光影，隨時間流轉而演變。這是一種低語般的設計，為空間帶來平靜。
          </p>
        </div>
      </div>

      {/* Designer Introduction */}
      <div id="designers" className="py-24 px-6 md:px-12 bg-[#2C2A26] text-[#F5F2EB]">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col items-center text-center gap-2 mb-20">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight font-light">Designers</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                name: "KE LIU",
                nameZh: "劉可",
                slogan: "Crafting silence through lines.",
                img: "images/designers/1.png"
              },
              {
                name: "Designer Two",
                nameZh: "設計師二",
                slogan: "The rhythm of minimal forms.",
                img: "images/designers/2.png"
              },
              {
                name: "Designer Three",
                nameZh: "設計師三",
                slogan: "Balance between code and chaos.",
                img: "images/designers/3.png"
              },
              {
                name: "Designer Four",
                nameZh: "設計師四",
                slogan: "Growing quiet flowing forms.",
                img: "images/designers/4.png"
              }
            ].map((designer, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center">
                <div className="w-full aspect-square overflow-hidden mb-6 bg-[#D6D1C7]/10">
                  <img
                    src={designer.img}
                    alt={designer.name}
                    className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <span className="text-lg md:text-xl font-medium tracking-wide">{designer.name}</span>
                  <span className="text-sm text-[#A8A29E] font-light">{designer.nameZh}</span>
                </div>
                <p className="text-sm md:text-base text-[#A8A29E] font-light italic mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  "{designer.slogan}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;