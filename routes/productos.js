const router = require('express').Router();
const Producto = require('../claseProductos');

router.get('/productos', async (req, res) => {
    try{
        res.send(Producto.productos);
    }catch (error){
        console.log(error.message);
    }

});

router.get('/productos/:id', async (req, res) => {
    try{
        let producto = Producto.productos.find(producto => producto.id === Number(req.params.id));
         if (producto) {
             res.send(producto);
         } else {
            res.status(404).send({ error: 'Producto no encontrado' });
    }
    }catch (error) {
     console.log(error.message);
    }   
});

router.post('/productos', async (req, res) => {
    try{
        let { title, price, thumbnail } = req.body;
        const producto = { title, price, thumbnail };
        producto.id = Producto.productos.length + 1;
        await Producto.productos.push(producto);
        res.send(Producto.productos);
    
    }catch (error) {
        console.log(error.message);
    }       
});

router.put('/productos/:id', async (req, res) => {
    try{
        let { title, price, thumbnail } = req.body;
        let index = await Producto.productos.findIndex(producto => producto.id === Number(req.params.id));
        if (index >= 0) {
            Producto.productos[index] = { title, price, thumbnail };
            Producto.productos[index].id = Number(req.params.id);
            res.send(Producto.productos[index]);
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    }catch (error) {
        console.log(error.message);
    }     
});

router.delete('/productos/:id', async (req, res) => {
    try{
        let index = await Producto.productos.findIndex(producto => producto.id === Number(req.params.id));
        if (index >= 0) {
            Producto.productos.splice(index, 1);
            res.send({ message: 'Producto eliminado' });
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    }catch (error) {
        console.log(error.message);
    }      
})

module.exports = router;