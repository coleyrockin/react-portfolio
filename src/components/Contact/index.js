// import "./styles.css";
import axios from "axios";
import { useState } from "react";

//JS

function Contact() {
  const [formStatus, setFormStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .post(
        "https://getform.io/f/a52040d1-8d60-403e-b0b4-2e087c95c65c",
        formData,
        { headers: { Accept: "application/json" } }
      )
      .then(function (response) {
        setFormStatus(true);
        setQuery({
          name: "",
          email: "",
          message: ""
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  //HTML FOR CONTACT
  return (
    <div className="Contact">
      <div className="form">
        <h1 className="flex justify-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-500">Contact Me</h1>
        <form className="w-12/12" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              placeholder="Full name"
              value={query.name}
              onChange={handleChange()}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
              name="email"
              placeholder="Email"
              value={query.email}
              onChange={handleChange()}
              required
            />
          </div>
          <div className="form-group">
            <textarea id="message"
              type="text"
              name="message"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange()}
              placeholder="Message"
              required
            >
            </textarea>
          </div>
          <div className="m-3 flex justify-center">
            {/* <input type="hidden" id="captchaResponse" name="g-recaptcha-response"></input> */}
            <button className="bg-gray-700 text-white font-medium py-2 px-4 rounded-full animate-bounce" type="submit"> Send  </button>
          </div>
          <div className="flex justify-center">
            {formStatus && <p>Message sent, Good day!</p>}
          </div>
        </form>
      </div >
    </div >
  );
}
export default Contact