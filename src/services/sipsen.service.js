const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { config } = require('../../config');
const schema = config.dbSchema;
class SipsenService {
  constructor(){
  }
  async find(body) {
    const {codigo, documento} = body
    const query = `SELECT 
      ssc.codigo ,
      u.usuario ,
      sscd.cantidad , 
      ssc.estado as estado_codigo, 
      p2.descripcion, 
      sscdd.estado AS estado_documento,
      gn.prm_tipo as titularidad,
      n2.estado as estado_notario
      from 
        ${schema}.usuario u
        inner join ${schema}.usuario_rol ur on ur.fid_usuario = u.id_usuario 
        inner join ${schema}.persona p on p.id_persona = u.fid_persona 
        inner join ${schema}.notario n2 on n2.fid_persona = p.id_persona 
        inner join ${schema}.gestion_notarial gn on gn.fid_notario = n2.id_notario 
        inner join ${schema}.servicio_sin_costo ssc ON ssc.fid_notaria = gn.fid_notaria
        inner join ${schema}.servicio_sin_costo_detalle sscd ON ssc.id_servicio_sin_costo = sscd.fid_servicio_sin_costo 
        inner join ${schema}.servicio_sin_costo_detalle_documento sscdd ON sscd.id_servicio_sin_costo_detalle  = sscdd.fid_servicio_sin_costo_detalle  
        inner join ${schema}.parametro p2 ON sscd.prm_grupo_documento = p2.clave 
        WHERE u.usuario  = \'${documento}\'
        AND ssc.codigo = \'${codigo}\'
        AND ssc.estado = 'FINALIZADO' 
        AND sscdd.estado = 'FINALIZADO'
        AND ur.rol = 'NOTARIO';`
    const [data] = await sequelize.query(query);
    return data;
  }

}

module.exports = SipsenService;