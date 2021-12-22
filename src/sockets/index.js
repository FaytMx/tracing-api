

// const orderDeliveryNamespace = io.of('/orders/delivery');


// orderDeliveryNamespace.on('connection', function (socket) {
//     console.log('USUARIO CONECTADO AL NAMESPACE /orders/delivery');

//     socket.on('position', function (data) {
//         console.log('EMITIO', data);
//       orderDeliveryNamespace.emit(`position/${data.id_order}`, { lat: data.lat, lng: data.lng });
//     });

//     socket.on('disconnect', function (data) {
//       console.log('USUARIO DESCONECTADO');
//     });
//   });


const delay = require('delay');
const data = require('../db/orderRoute.json');



module.exports = (io) => { 
    console.log(io);

    io.on("connection", (client) => {
        console.log("Cliente conectado");
      
        client.emit("order", data);
      
        client.on("disconnect", () => {
          console.log("Cliente desconectado");
        });
      
        client.on("mensaje", (payload) => {
          console.log("Mensaje!!", payload);
      
          io.emit("mensaje", { admin: "Nuevo mensaje" });
        });
      

        client.on("nueva-orden",async (payload) => {
            console.log("Mensaje!!", payload);

            for (const step of data) {
                console.log(step)
                io.emit("step", step);
                await delay(500)
            }
        
          });

        // client.on("emitir-mensaje", (payload) => {
        //   console.log(payload);
        //   client.broadcast.emit("nuevo-mensaje", payload);
        // });
      
        // client.on("vote-band", (payload) => {
        //   bands.voteBand(payload.id);
        //   io.emit("active-bands", bands.getBands());
        // });
      
        // client.on("add-band", (payload) => {
        //   const newBand = new Band(payload.name);
        //   bands.addBand(newBand);
        //   io.emit("active-bands", bands.getBands());
        // });
      
        // client.on("delete-band", (payload) => {
        //  console.log(payload)
        //   bands.deleteBand(payload.id);
        //   io.emit("active-bands", bands.getBands());
        // });
      });
      
}
