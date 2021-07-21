using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OA_WXAPP.Models
{
    public class HrmResource
    {
        public HrmResource()
        {

        }
        public HrmResource(int id)
        {
            this.id = id;
        }
        #region 属性

        /// <summary>
        ///主键
        /// </summary>
        public int id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string loginid { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string lastname { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string password { get; set; }

        /// <summary>
        /// 公司ID
        /// </summary>
        public long subcompanyid1 { get; set; }

        /// <summary>
        /// 部门ID
        /// </summary>
        public long departmentid { get; set; }

        public string openid { get; set; }

        /// <summary>
        /// 签名图片url
        /// </summary>
        public string FileRoute { get; set; }

        public DateTime FileTime { get; set; }

        #endregion
    }
}