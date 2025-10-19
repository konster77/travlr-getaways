const jwt=require('jsonwebtoken');
module.exports=(roles=[])=>{
  return (req,res,next)=>{
    const header=req.headers.authorization||'';
    const [type,token]=header.split(' ');
    if(type!=='Bearer'||!token) return res.status(401).json({message:'Missing/invalid token'});
    try{
      const payload=jwt.verify(token,process.env.JWT_SECRET); // {sub, role, email}
      if(roles.length && !roles.includes(payload.role)) return res.status(403).json({message:'Forbidden'});
      req.user=payload; next();
    }catch{ res.status(401).json({message:'Unauthorized'}); }
  };
};
