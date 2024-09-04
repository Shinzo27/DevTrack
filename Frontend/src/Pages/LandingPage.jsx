import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  BarChart2,
  Calendar,
  CheckCircle,
  Star,
  Users,
  Zap,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigateTo = useNavigate();
  
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <header className="px-4 lg:px-6 h-14 flex justify-around items-center">
          <Link className="flex items-center justify-center" href="#">
            <Zap className="h-6 w-6" />
            <span className="sr-only">DevTrack</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#contact"
            >
              Contact
            </Link>
          </nav>
        </header>
        <main className="flex flex-col items-center justify-center overflow-auto">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center justify-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Manage Projects with Ease
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Streamline your workflow, boost productivity, and deliver
                    results with our all-in-one project management solution.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button onClick={()=>navigateTo('/signin')}>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Powerful Features
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <BarChart2 className="w-8 h-8 mb-2" />
                    <CardTitle>Advanced Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Gain insights with real-time project analytics and
                      customizable dashboards.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="w-8 h-8 mb-2" />
                    <CardTitle>Team Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Foster seamless communication and collaboration among team
                      members.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Calendar className="w-8 h-8 mb-2" />
                    <CardTitle>Resource Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Efficiently allocate resources and track time across
                      multiple projects.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                What Our Clients Say
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardContent className="pt-8">
                    <div className="flex items-start space-x-4">
                      <Star className="w-8 h-8 text-yellow-400" />
                      <div>
                        <p className="text-lg font-semibold">Incredible Tool</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          "DevTrack has revolutionized how we manage our
                          projects. It's intuitive, powerful, and has greatly
                          improved our team's productivity."
                        </p>
                        <p className="text-sm font-medium mt-2">
                          - Sarah Johnson, CEO of TechInnovate
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-8">
                    <div className="flex items-start space-x-4">
                      <Star className="w-8 h-8 text-yellow-400" />
                      <div>
                        <p className="text-lg font-semibold">Game Changer</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          "We've tried many project management tools, but
                          DevTrack stands out. It's comprehensive,
                          user-friendly, and has become an essential part of our
                          daily operations."
                        </p>
                        <p className="text-sm font-medium mt-2">
                          - Mark Thompson, Project Manager at BuildRight
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section
            id="pricing"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Simple, Transparent Pricing
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">$19</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per user / month
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Up to 10 projects
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Basic analytics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        24/7 support
                      </li>
                    </ul>
                    <Button className="w-full mt-6">Choose Plan</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">$49</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      per user / month
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Unlimited projects
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Resource management
                      </li>
                    </ul>
                    <Button className="w-full mt-6">Choose Plan</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">Custom</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      contact for pricing
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Custom solutions
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        Dedicated support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        On-premise options
                      </li>
                    </ul>
                    <Button className="w-full mt-6">Contact Sales</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="contact" className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ready to Get Started?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Join thousands of teams already using DevTrack to streamline
                    their project management.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <Button className="w-full">Start Your Free Trial</Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    No credit card required. 14-day free trial.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2023 DevTrack Inc. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
