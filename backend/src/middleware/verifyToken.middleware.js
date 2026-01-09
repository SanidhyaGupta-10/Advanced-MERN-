import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded) return res.status(401).json({ message: 'Unauthorized' })

        req.userId = decoded;
        next()

    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized' });
    };

}