export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4  text-gray-800 ">
      <h1 className="text-3xl font-bold mb-6 ">
        About Trezo Books
      </h1>

      <p className="text-lg mb-6 leading-relaxed">
        At <span className="font-semibold text-blue-600 ">Trezo Books</span>, we believe in the power of stories to inspire, educate, and transform lives.
        Whether you're a student, a curious reader, or a lifelong learner, our goal is to connect you with the perfect book.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mt-10">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-blue-600 ">Our Mission</h2>
          <p className="text-base leading-relaxed">
            To make quality books accessible to everyone by providing a seamless and affordable online shopping experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-blue-600 ">Why Trezo?</h2>
          <p className="text-base leading-relaxed">
            We carefully curate our catalog, focusing on both classic literature and modern bestsellers. With fast shipping and secure checkout, Nova Books is your trusted destination for all things reading.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-600">Contact Us</h2>
        <p className="text-base">
          Have questions or suggestions? Feel free to reach out through our <span className="underline text-blue-600"><a href="/contact">contact page</a></span>.
        </p>
      </div>
    </div>
  );
}
