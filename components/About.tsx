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

          <ParallaxMedia
            src="https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_25fps.mp4"
            type="video"
            alt="LINEA Design Studio - Digital Prototyping"
            className="w-full h-[400px] mt-12"
            mediaClassName="grayscale contrast-[0.9] brightness-110"
            speed={-0.15} // Slower background movement
            scrollScrub={true}
          />
          <p className="text-sm font-medium uppercase tracking-widest text-[#A8A29E] mt-4">
            The Process: Digital Craft / 數位工藝
          </p>
        </div>
      </div>

      {/* Philosophy Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
          <ParallaxMedia
            src="https://videos.pexels.com/video-files/2759477/2759477-hd_1920_1080_30fps.mp4"
            type="video"
            alt="White fluid abstract form"
            className="w-full h-full"
            mediaClassName="transition-transform duration-[2s] group-hover:scale-105" // Preserve hover scale if possible
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

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#2C2A26] text-[#F5F2EB]">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">The Architect's Eye / 建築師之眼</span>
          <h3 className="text-4xl md:text-5xl font-serif mb-2 text-[#F5F2EB] leading-tight">
            Structure & Fragility.
          </h3>
          <h4 className="text-2xl md:text-3xl font-light text-[#A8A29E] mb-8">
            結構與脆弱
          </h4>
          <p className="text-lg text-[#A8A29E] font-light leading-relaxed mb-6 max-w-md">
            We play with the tension between strength and delicacy. Our 3D-printed lattices look fragile, like dried coral or lace, but possess the structural integrity of a truss.
          </p>
          <p className="text-base text-[#A8A29E] font-light leading-relaxed mb-12 max-w-md opacity-70">
            我們遊走於力量與細緻之間的張力。我們 3D 列印的網格看似脆弱，如乾燥的珊瑚或蕾絲，卻擁有桁架般的結構完整性。這是一種新型態的物質性：輕盈、複雜且美麗。
          </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden group">
          <ParallaxMedia
            src="https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4"
            type="video"
            alt="Intricate white texture"
            className="w-full h-full"
            mediaClassName="transition-transform duration-[2s] group-hover:scale-105 brightness-90 grayscale"
            speed={0.15}
            scrollScrub={true}
          />
        </div>
      </div>
    </section>
  );
};

export default About;