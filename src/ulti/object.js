module.exports=
{
    maptoObjects: function objects(objects)
    {
        return objects[0].toObject();
    }, 
    maptoObject: function object(objects)
    {
        return objects? objects.toObject() : objects;
    },
};