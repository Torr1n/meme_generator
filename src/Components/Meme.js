import React from "react";

function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function newImage() {
    let memeImg = allMemes[Math.floor(Math.random() * allMemes.length)];
    setMeme((prevMeme) => ({ ...prevMeme, randomImage: memeImg.url }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  return (
    <main className="meme--main">
      <div className="meme--form">
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          className="meme--input"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          className="meme--input"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="meme--button" onClick={newImage}>
          Get a new meme image 🖼️
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--img" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
