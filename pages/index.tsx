import React, { useState } from "react";
import Image from "next/image";

const Home = () => {
  const [alertClass, setAlertClass] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = {
      code: event.target.code.value.toLowerCase().trim(),
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (response.status !== 200) {
      setAlertClass(
        "w-80 mt-4 p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400"
      );
      setMessage(result.error);
      return;
    }

    setAlertClass(
      "w-80 mt-4 p-4 mb-4 text-sm rounded-lg bg-gray-800 text-green-400"
    );
    setMessage(result.location);
  };

  return (
    <div className="grid place-items-center">
      <Image
        src="/djktreasure.png"
        alt="Treasure hunt Riga"
        height={500}
        width={500}
      />
      <p className="mt-6 w-80 text-lg font-normal lg:text-xl text-gray-400 mb-4">
        Ahoy, me hearties! Set yer sights on the wondrous city of Riga, where a
        hidden treasure awaits those brave enough to embark on a daring
        adventure!
      </p>
      <form onSubmit={handleSubmit} className="w-80">
        <label
          htmlFor="code"
          className="relative block overflow-hidden border-b bg-transparent pt-3 focus-within:border-gray-800 border-gray-700"
        >
          <input
            type="text"
            id="code"
            placeholder="Arr, the secret phrase, matey!"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-white text-lg"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 bg-gray-800 hover:bg-gray-900 focus:ring-gray-950"
          >
            Arr!!
          </button>
          <span className="absolute start-0 top-2 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs text-gray-200">
            Arr, the secret phrase, matey!
          </span>
        </label>
      </form>
      <div id="alert" role="alert" className={alertClass}>
        <span id="message" className="font-medium">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Home;
