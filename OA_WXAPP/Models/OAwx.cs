using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OA_WXAPP.Models
{
    public class OAwx
    {
        public OAwx()
        {

        }
        #region 属性

        /// <summary>
        ///主键
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// 员工编号
        /// </summary>
        public string requestId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int formmodeid { get; set; }

        /// <summary>
        ///
        /// </summary>
        public int modedatacreater { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int modedatacreatertype { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string modedatacreatedate { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string modedatacreatetime { get; set; }


        /// <summary>
        /// 
        /// </summary>
        public int OAAccount { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string WxOpenid { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string WxName { get; set; }
        /// <summary>
        /// 员工表的id
        /// </summary>
        public int rid { get; set; }

        /// <summary>
        /// 员工姓名
        /// </summary>
        public string CName { get; set; }

        #endregion
    }
}