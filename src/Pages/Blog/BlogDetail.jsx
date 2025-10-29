 import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blog11 from "../../assets/blog111.jpg"

const blogDetails = {
  1: {
    title: "Power of Panchmukhi Rudraksha: Balance & Protection",
    image: blog11,
    content: `
The **Panchmukhi Rudraksha** represents Lord Shiva in his five divine manifestations — *Sadyojata, Tatpurusha, Aghora, Vamadeva,* and *Ishana*. It symbolizes the five elements of nature — **Earth, Water, Fire, Air, and Ether** — harmonizing them within your body and mind.

### Spiritual Meaning:
This bead enhances inner stability, grounding, and calmness. It connects you with the universal energy and strengthens your aura, shielding you from negative vibrations and energy drains.

### Benefits:
- Balances the five elements within the body  
- Enhances clarity and decision-making  
- Promotes peace, focus, and courage  
- Reduces stress and anxiety  
- Helps align the body with spiritual goals  

### How to Wear:
The Panchmukhi Rudraksha can be worn by anyone. It is especially beneficial for students, professionals, and those who meditate regularly. It should be energized with the mantra **“Om Hreem Namah”** before wearing.

### Ritual Tip:
Always wear it on a Monday after bathing, and keep your mind pure. Avoid non-vegetarian food and alcohol while wearing it.
    `,
  },
  2: {
    title: "How to Identify Genuine Rudraksha Beads",
    image: "/assets/rudraksha2.jpg",
    content: `
With so many counterfeit Rudraksha beads flooding the market, it’s crucial to know how to identify a **real Rudraksha**. Authentic Rudrakshas have distinct natural lines known as *mukhis*, which run from the top (where the seed is attached to the tree) to the bottom.

### Key Identification Tips:
- A genuine Rudraksha **sinks in water**, while a fake one often floats.  
- The lines (mukhis) should be **naturally formed** — not etched or carved.  
- Each bead has a **natural hole** through its center.  
- Real beads have a slightly **rough texture**, not perfectly smooth.  

### Beware of Fakes:
Fake beads are sometimes made of wood, plastic, or even tampered natural seeds. These have no spiritual energy or bioelectric field.

### Spiritual Significance:
When worn correctly, a real Rudraksha helps balance one’s energy field and strengthens the connection between body and consciousness. Always source Rudraksha from trusted spiritual suppliers or temples.
    `,
  },
  3: {
    title: "Spiritual Benefits of Wearing Rudraksha Daily",
    image: "/assets/rudraksha3.jpg",
    content: `
Wearing a **Rudraksha daily** is not just a symbol of devotion — it’s a way to stay aligned with positive energy throughout your day. Ancient yogis and sages have worn Rudrakshas for centuries to stay focused, calm, and spiritually centered.

### Benefits of Daily Wear:
- Calms the nervous system and stabilizes the mind  
- Enhances focus, especially during meditation or prayer  
- Protects from emotional imbalances and negative influences  
- Helps maintain a steady heart rate and reduce stress  
- Promotes deeper sleep and mental clarity  

### Spiritual Energy Field:
The bead generates a magnetic field around the wearer, purifying the aura and balancing the chakras. Over time, it helps the mind move away from chaos and closer to peace and self-realization.

### Tip:
When wearing daily, remove it before sleep or bathing with hot water. Clean occasionally with milk and water.
    `,
  },
  4: {
    title: "Importance of Rudraksha in Meditation Practice",
    image: "/assets/rudraksha4.jpg",
    content: `
Meditation is a gateway to inner peace, and **Rudraksha** acts as a divine amplifier for this process. When used during meditation, the bead vibrates with spiritual energy, helping you connect with your higher self.

### How Rudraksha Helps Meditation:
- Enhances concentration by reducing wandering thoughts  
- Aligns breath (prana) and mind, helping attain deeper focus  
- Neutralizes stress and anxiety before meditation  
- Increases awareness and mindfulness  

### Using Rudraksha Mala:
A Rudraksha mala with 108 beads is traditionally used to chant mantras like **“Om Namah Shivaya”** or **“Om Hreem Namah”**. Each bead acts as a spiritual conductor, helping you track mantra counts while stabilizing your energy.

### Advanced Practice:
Those on deeper meditative paths can wear specific mukhi Rudrakshas (like 5, 9, or 11 mukhi) for accelerated progress. It’s also believed to awaken the **Ajna (third eye) chakra** when meditated upon regularly.
    `,
  },
  5: {
    title: "The Science Behind Rudraksha Energy Vibrations",
    image: "/assets/rudraksha5.jpg",
    content: `
Beyond mythology, Rudraksha beads hold **scientific significance**. Researchers have found that these beads possess **electromagnetic and inductive properties** that influence the human body’s bioelectric field.

### Scientific Findings:
- Rudraksha beads stabilize the heart’s rhythm and blood pressure.  
- They act as capacitors, storing and discharging energy evenly.  
- Wearing Rudraksha enhances mental equilibrium and focus.  
- The vibration frequency of Rudraksha aligns with the human heartbeat, promoting harmony.  

### Modern Insights:
Studies in electrophysiology suggest that Rudraksha beads can absorb and emit specific bioenergetic frequencies. This effect helps in reducing stress and regulating the nervous system — a scientific explanation for the spiritual calm many experience.

### Conclusion:
Science and spirituality meet in Rudraksha. It is not superstition but a natural energy tool that harmonizes both the physical and subtle bodies.
    `,
  },
  6: {
    title: "Choosing the Right Rudraksha for Your Zodiac Sign",
    image: "/assets/rudraksha6.jpg",
    content: `
Every **Rudraksha mukhi (face)** corresponds to a planet and zodiac energy. Wearing the right Rudraksha based on your zodiac sign enhances positivity, prosperity, and emotional stability.

### Zodiac Guide:
- **Aries (Mars):** 3 Mukhi Rudraksha — removes past karmic blocks.  
- **Taurus (Venus):** 6 Mukhi Rudraksha — enhances love and balance.  
- **Gemini (Mercury):** 4 Mukhi Rudraksha — improves communication and wisdom.  
- **Cancer (Moon):** 2 Mukhi Rudraksha — promotes emotional peace.  
- **Leo (Sun):** 12 Mukhi Rudraksha — boosts confidence and leadership.  
- **Virgo (Mercury):** 5 Mukhi Rudraksha — balances intellect and patience.  
- **Libra (Venus):** 13 Mukhi Rudraksha — attracts success and charm.  
- **Scorpio (Mars):** 3 or 11 Mukhi Rudraksha — builds courage and transformation.  
- **Sagittarius (Jupiter):** 5 or 7 Mukhi Rudraksha — increases faith and focus.  
- **Capricorn (Saturn):** 7 Mukhi Rudraksha — promotes stability and wealth.  
- **Aquarius (Saturn):** 14 Mukhi Rudraksha — enhances intuition and awareness.  
- **Pisces (Jupiter):** 2 or 5 Mukhi Rudraksha — deepens spirituality.  

### Final Advice:
Before choosing, consult an expert or astrologer. Cleanse and energize the bead before wearing it, ideally on a Monday or a full moon day.
    `,
  },
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogDetails[id];

  if (!blog)
    return (
      <div className="text-center mt-20 text-red-900 text-xl">
        Blog not found
      </div>
    );

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-red-100">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold text-red-900 mb-4">{blog.title}</h2>
        <div
          className="prose prose-red max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: blog.content.replace(/\n/g, "<br/>"),
          }}
        />
        <button
          onClick={() => navigate("/blog")}
          className="mt-6 bg-red-900 text-yellow-100 px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
        >
          ← Back to Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
