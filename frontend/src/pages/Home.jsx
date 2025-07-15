import React from "react";
import { Briefcase, Rocket, FileText } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ui/ProjectCard";
import { featuredProjects } from "../constants";

export default function Home() {
    const steps = [
        {
            icon: () => <FileText size={28} className="text-indigo-600" />,
            title: "Post a Project",
            subtitle: "Start in Minutes",
            desc: "Create a detailed project listing to attract top freelancers with matching expertise.",
        },
        {
            icon: () => <Briefcase size={28} className="text-indigo-600" />,
            title: "Bid & Propose",
            subtitle: "Get Quality Proposals",
            desc: "Freelancers send tailored proposals and competitive bids within hours of posting.",
        },
        {
            icon: () => <Rocket size={28} className="text-indigo-600" />,
            title: "Collaborate & Deliver",
            subtitle: "Track & Succeed",
            desc: "Communicate, manage tasks, and ensure on-time delivery with built-in project tools.",
        },
    ];

    return (
        <div className="min-h-screen text-gray-800 bg-gradient-to-b from-white via-indigo-50 to-white">

{/* Hero Section */}
<section className="bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-20 w-full">
  <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Discover Talent. Deliver Projects. Dominate Freelancing.
      </span>
    </h1>
    <p className="text-gray-600 text-lg mb-10">
      HireHub connects brilliant freelancers with employers worldwide — on
      one intuitive, modern platform.
    </p>
    <div className="flex gap-4 flex-wrap justify-center">
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition">
        Get Started
      </button>
      <button className="border border-gray-300 hover:border-indigo-500 px-6 py-3 rounded-full font-medium text-gray-700 transition">
        Learn More
      </button>
    </div>
  </div>
</section>


{/* Trusted By Section */}
<section className="bg-gradient-to-b from-white via-indigo-50 to-indigo-100 py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
      Trusted by Leading Startups
    </h2>
    <p className="text-gray-600 text-lg mb-10">
      HireHub empowers high-growth teams to scale with top talent.
    </p>

    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
      {[
        "StartupHub",
        "RemoteGo",
        "LaunchPad",
        "DevHouse",
        "CodeNest",
        "PixelForge",
      ].map((brand, i) => (
        <div
          key={i}
          className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold text-sm sm:text-base px-5 py-2 rounded-full shadow-sm hover:shadow-md transition"
        >
          {brand}
        </div>
      ))}
    </div>
  </div>
</section>


{/* How It Works */}
<section className="py-20 px-6 bg-gradient-to-b from-indigo-100 via-white to-white">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
      How It Works
    </h2>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-white border border-indigo-100 transition-all"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 mb-4 mx-auto">
            {step.icon()}
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-1">{step.title}</h3>
          <p className="text-sm text-indigo-500 font-medium mb-2">{step.subtitle}</p>
          <p className="text-sm text-gray-600">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>



            {/* Hiring Made Easy */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Hiring Made Easy
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Seamless hiring with hand-picked talent and expert guidance — all in under 24 hours.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {[
                            {
                                number: "1",
                                title: "Talk to One of Our Industry Experts",
                                desc: "An expert on our team will work with you to understand your goals, technical needs, and team dynamics.",
                            },
                            {
                                number: "2",
                                title: "Work With Hand-Selected Talent",
                                desc: "Within days, we'll introduce you to the right talent for your project. Average time to match is under 24 hours.",
                            },
                            {
                                number: "3",
                                title: "The Right Fit, Guaranteed",
                                desc: "Work with your new team member on a trial basis (pay only if satisfied), ensuring you hire the right people for the job.",
                            },
                        ].map((step, idx) => (
                            <div
                                key={idx}
                                className="bg-white/90 border border-indigo-100 rounded-2xl p-6 transition-all hover:scale-[1.015] backdrop-blur-sm"
                            >
                                <div className="text-indigo-600 text-4xl font-bold mb-4">{step.number}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Featured Projects */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold tracking-tight text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Featured Projects
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                </div>
            </section>


            {/* FAQ */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "Is it free to post a project?",
                                a: "Yes, employers can post projects for free. Fees apply only upon successful freelancer hire."
                            },
                            {
                                q: "How does payment work?",
                                a: "Payments are managed via a secure escrow system. Funds are released only after milestones are completed."
                            },
                            {
                                q: "Can freelancers work part-time?",
                                a: "Absolutely! HireHub supports both part-time and full-time freelancers across time zones."
                            }
                        ].map((item, i) => (
                            <div key={i} className="border-b pb-4">
                                <h4 className="font-semibold text-gray-800">{item.q}</h4>
                                <p className="text-sm text-gray-600 mt-2">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Newsletter */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-xl mx-auto text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Stay Updated</h3>
                    <p className="text-gray-600 mb-6 text-sm">
                        Get the latest freelancing insights, tips, and featured projects — straight to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="flex-1 border border-gray-300 px-4 py-2 rounded-md"
                        />
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>



            {/* Client Satisfaction */}
            <section className="py-16 px-6 bg-gradient-to-b from-white via-indigo-50 to-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Our Clients’ Satisfaction is Our Top Priority
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        We're trusted by early adopters and startups alike — helping them
                        connect with top freelancers and deliver high-impact projects.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-6 text-center mb-14">
                        {[
                            { number: "1000+", label: "Clients Onboarded" },
                            { number: "80+", label: "Successful Projects Delivered" },
                            { number: "4.8/5", label: "Average Client Rating" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl font-bold text-indigo-600">{stat.number}</div>
                                <div className="text-gray-700 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {[
                            {
                                name: "Ishaan K.",
                                role: "Product Lead, FinStart",
                                quote:
                                    "HireHub connected us with a skilled developer within days. It felt like having a trusted extension of our team from day one.",
                            },
                            {
                                name: "Ritika P.",
                                role: "Startup Founder",
                                quote:
                                    "As a solo founder, I needed design and dev help fast. HireHub made the process smooth, professional, and high quality.",
                            },
                            {
                                name: "Akshay M.",
                                role: "Tech Consultant",
                                quote:
                                    "The HireHub team truly understands what startups need — talent that can hit the ground running without friction.",
                            },
                        ].map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-white/90 border border-indigo-100 p-6 rounded-xl backdrop-blur-sm"
                            >
                                <p className="text-gray-700 text-sm mb-4 italic">"{testimonial.quote}"</p>
                                <hr className="my-4 border-indigo-100" />
                                <div className="text-sm text-gray-800 font-semibold">{testimonial.name}</div>
                                <div className="text-xs text-gray-500">{testimonial.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 bg-gradient-to-b from-white via-indigo-50 to-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        Ready to find your next gig or hire top talent?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join HireHub today and be part of the future of freelancing —
                        faster, simpler, smarter.
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition">
                        Join Now
                    </button>
                </div>
            </section>
        </div>
    );
}
