
const Gallery = ({ images }) => {
  
  return (
    <div>
        <div className="image-container">
            <h2> Your Art Gallery! 🖼️</h2>
            {images && images.length > 0 ? (
                images.map((pic, index) => (
                    <li className="gallery" key={index}>
                      <img
                        className="gallery-screenshot"
                        src={pic}
                        alt="Undefined screenshot from query"
                        width="100"
                        height ="150"
                      />
                    </li>
                  )
                
                )
            ) : (
                <div>
                <h3>You haven't found any art yet!</h3>
                </div>
            )}
            </div>
    </div>
  );
};

export default Gallery;