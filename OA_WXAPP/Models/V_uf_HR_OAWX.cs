using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OA_WXAPP.Models
{
    public class V_uf_HR_OAWX
    {
        #region 属性

        /// <summary>
        /// 公司
        /// </summary>
        public string subcompanyname { get; set; }

        /// <summary>
        /// 微信openid
        /// </summary>
        public string WxOpenid { get; set; }

        /// <summary>
        /// 微信名字
        /// </summary>
        public string WxName { get; set; }

        /// <summary>
        /// 文件路径
        /// </summary>
        public string FileRoute { get; set; }

        /// <summary>
        /// 文件上传时间
        /// </summary>
        public DateTime FileTime { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Workcode { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string lastname { get; set; }

        public string loginid { get; set; }

        #endregion
    }
}