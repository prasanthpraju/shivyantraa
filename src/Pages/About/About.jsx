import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ===== Banner Section ===== */}
      <section className="relative w-full aspect-[16/5] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://rudralife.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner.6dc5124a.jpg&w=1920&q=75')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-start p-4 md:p-10">
          <button onClick={() => navigate(-1)}>
            <ArrowBackIosIcon
              style={{ color: "white", fontWeight: "bold", fontSize: "40px" }}
            />
          </button>
          <h1 className="text-white ml-3 text-2xl sm:text-3xl md:text-5xl font-bold">
            About Us
          </h1>
        </div>
      </section>

      {/* ===== About Content ===== */}
      <section className="px-5 md:px-10 py-10 leading-7 text-base text-gray-800 space-y-5">
        <p>
          An organization was established 18 years ago, to educate, promote and
          supply the best quality of Nepal Rudraksha. It went on to establish a
          grand global presence by becoming the world's leading organization in
          this field. Rudralife is an authority in the field of Rudraksha.
          Slowly but surely they became the most discussed organization in print
          and electronic media. They are recognized as a leading brand with 4
          registered trademark products. All the Rudraksha supplied by them are
          genuine and are subjected to the best quality checks in the market.
          They are certified by an ISO 9001:2015 accredited laboratory, that
          adheres to total quality management principles to achieve a zero
          defect approach while supplying Rudraksha.
        </p>

        <p>
          Rudraksha is an ancient bead of divine mysticism and Rudralife is the
          only organization that has actively involved scientific research on
          this bead. Wearing a Rudraksha requires the right knowledge and expert
          advice which Rudralife incorporates in its strategy while recommending
          this bead to its innumerous customers. This has resulted in positive
          outcome that has translated into positive testimonials that are
          innumerable.
        </p>

        <p>
          The individual approach in the process of recommendation that
          Rudralife emphasizes on has been extremely beneficial to all these
          individuals and they in turn reverted with positive feedbacks.
          Rudralife combines divine wisdom with accurate individual analysis and
          formulates unique combinations of Rudraksha, irrespective of whether
          it is a common man or a celebrity. This is the reason people at large
          have benefitted by purchasing and wearing Rudraksha recommended by the
          panel of experts at Rudralife.
        </p>

        <p>
          In order to maintain the literary heritage of ancient times,
          Rudralife provides writings in relevant scriptures that reveal the
          properties and benefits of the mystic Rudraksha.
        </p>
      </section>

      {/* ===== Mission Section ===== */}
      <section className="px-5 md:px-10 pb-10">
        <h2 className="text-2xl font-bold text-red-900 mb-4 uppercase">
          Mission
        </h2>

        <ul className="list-disc list-inside space-y-3 text-gray-800 leading-7 marker:text-red-900 marker:text-xl">
          <li>Our Aim Is To Make People Aware Of The Genuine Rudraksha Bead.</li>
          <li>
            To Take Utmost Care In Maintaining The Quality And Sanctity Of The
            Bead. Support and empower skilled artisans by providing them with
            meaningful opportunities to showcase their craft.
          </li>
          <li>
            To Promote Further Research And Analysis On Rudraksha, So That The
            Results Obtained May Be Used For The Benefit Of All.
          </li>
          <li>
            To Educate People On Rudraksha So That They Can Use Them To Heal And
            Empower Themselves According To The Knowledge Presented In Our
            Religious Texts And New Scientific Research.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
