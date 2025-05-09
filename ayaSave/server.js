// 1. 加载需要的工具
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); 
const db = new sqlite3.Database('C:/Users/Administrator/Desktop/sealdice-core_1.3.0_windows_amd64/data/default/extensions/xp/databases/weapons.db');
// 2. 创建服务器
const app = express();
app.use(cors()); // 允许跨域访问

// 3. 设置处理请求的规则
app.get('/weapon', (req, res) => {
  // 从请求中获取关键词
  const { mode: numMode, name: encodedName, level: numLevel } = req.query;

  // 参数校验
  if (!numMode || !encodedName || !numLevel) {
    return res.status(400).json({ 
      error: "缺少必要参数，格式应为：/weapon?mode=模式&name=名称&level=等级" 
    });
  }
  // 解码URL编码的参数（示例解码名称）
  const decodedName = decodeURIComponent(encodedName);
  let sql = '';
  if(numMode == 0)//全随机模式
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
    
  }
  else if(numMode == 1)//按大类随机
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    WHERE c.category_name = '${decodedName}'  -- 按解码后的大类名称过滤
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
  }
  else if(numMode == 2)//按子类随机
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    WHERE s.subcategory_name = '${decodedName}'  
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
  }
  else if(numMode == 3)//按子类随机
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    WHERE v.variant_name = '${decodedName}'  
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
  }
  db.all(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: "数据库查询失败: " + err.message 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: "未找到匹配的武器信息" 
      });
    }
    return res.json({
      success: true,
      mode: parseInt(numMode),
      name: decodedName,
      level: parseInt(numLevel),
      weaponInfo: results[0],  // 获取第一行数据
      message: "已成功收到你发送的关键词！"
    });
  });
  

  
});

// 4. 启动服务器（监听3000端口）
app.listen(3000, () => {
  console.log('服务已启动！访问地址：http://localhost:3000');
});