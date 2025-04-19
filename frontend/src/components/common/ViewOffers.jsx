import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewOffers = () => {
  const [offers, setOffers] = useState([]);

  const deleteExpiredOffers = (offers) => {
    const currentDate = new Date();

    offers.forEach((offer) => {
      const offerEndDate = new Date(offer.endDate);

      if (currentDate > offerEndDate) {
        axios
          .delete(`http://localhost:5000/offers/${offer._id}`)
          .then((res) => {
            console.log(`Offer ${offer._id} deleted successfully`);

            setOffers((prevOffers) =>
              prevOffers.filter((item) => item._id !== offer._id)
            );
          })
          .catch((err) =>
            console.log(`Error deleting offer ${offer._id}:`, err)
          );
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/offers/location")
      .then((res) => {
        console.log("Fetched offers:", res.data);
        setOffers(res.data.data);

        deleteExpiredOffers(res.data.data);
      })
      .catch((err) => console.log("Error fetching offers", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-dark font-weight-bold mb-4">Available Offers</h2>

      {offers.length === 0 ? (
        <p className="text-muted">No offers available.</p>
      ) : (
        <div className="row">
          {offers.map((offer) => (
            <div key={offer._id} className="col-md-4 mb-4">
              <div className="card">
                {offer.image && (
                  <img
                    src={`http://localhost:5000/uploads/${offer.image}`}
                    alt={offer.title}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{offer.title}</h5>
                  <p className="card-text">{offer.description}</p>
                  <span
                    className={`badge ${
                      offer.active ? "badge-success" : "badge-danger"
                    }`}
                  >
                    {offer.active ? "Active" : "Inactive"}
                  </span>
                  <p className="text-muted mt-2">
                    Valid: {new Date(offer.startDate).toLocaleDateString()} -{" "}
                    {new Date(offer.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-muted mt-1">
                    Location: {offer.locationId?.area}, {offer.locationId?.city}
                    , {offer.locationId?.state}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOffers;
