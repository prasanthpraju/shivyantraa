 import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blog11 from "../../assets/blog111.jpg";

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
  // ... other blog entries remain same ...
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogDetails[id];

  if (!blog)
    return (
      <div className="text-center mt-20 text-[#4a1d06] text-xl">
        Blog not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fdf8f2] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-[#fffaf5] rounded-2xl shadow-lg p-8 border border-[#c8b199]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold text-[#4a1d06] mb-4">
          {blog.title}
        </h2>
        <div
          className="prose max-w-none text-[#5a3720] leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: blog.content.replace(/\n/g, "<br/>"),
          }}
        />
        <button
          onClick={() => navigate("/blog")}
          className="mt-6 bg-[#4a1d06] text-[#fff7e9] px-4 py-2 rounded-lg hover:bg-[#5c2810] transition-all"
        >
          ← Back to Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
