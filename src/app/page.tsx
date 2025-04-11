import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { ArrowUpRight, CheckCircle2, Shield, Users, Zap } from "lucide-react";
import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Dashboard Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive client management system provides powerful tools
              to streamline your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Customizable Widgets",
                description:
                  "Monitor recent clients, order status, and communication activity",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Unified Inbox",
                description:
                  "Manage email, WhatsApp, and live chat in one place",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Interactive Analytics",
                description:
                  "Visualize order fulfillment and client engagement metrics",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Role-Based Access",
                description: "Control permissions with a responsive interface",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">3+</div>
              <div className="text-blue-100">Communication Channels</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Real-time Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Client Management</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Client Management
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the power of our unified dashboard with customizable
            widgets, real-time notifications, and comprehensive analytics.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Access Dashboard
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
