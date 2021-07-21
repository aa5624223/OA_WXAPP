using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OA_WXAPP.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace OA_WXAPP.Controllers
{
    public class HomeController : Controller
    {
        public log4net.ILog Log = log4net.LogManager.GetLogger(typeof(HomeController));

        public ActionResult Index()
        {
            //Response.Redirect("/sign/index.html");
            string url = HttpContext.Request.Url.AbsolutePath;
            if (url=="/")
            {
                Response.Redirect("/sign/index.html");
            }
            else
            {
                Response.Redirect(url + "/sign/index.html");
            }
            
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        /// <summary>
        /// 不做免登
        /// 1.1 没有传openid 则获取openid
        /// 1.2 传了账号密码 有openid
        /// 1.2.1 判断账号密码是否正确
        /// 1.2.1.1 正确
        /// 1.2.1.1.1 是否绑定微信表
        /// 未绑定：添加微信表的记录
        /// 1.2.1.2 不正确
        /// 返回1
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>

        [HttpGet]
        public string Login(FormCollection fc)
        {
            JObject msg = new JObject();
            string appid = System.Configuration.ConfigurationManager.AppSettings["appid"];
            string secret = System.Configuration.ConfigurationManager.AppSettings["secret"];
            string connStr = System.Configuration.ConfigurationManager.AppSettings["connStr"];

            string code = Request.QueryString["code"];
            string openid = Request.QueryString["openid"];
            string userName = Request.QueryString["userName"];
            string userPas = Request.QueryString["userPas"];
            string wxName = Request.QueryString["wxName"];
            SqlConnection conn = null;
            try
            {
                string sql = null;
                if (string.IsNullOrEmpty(openid))
                {
                    string QQurl = string.Format("https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code", appid, secret, code);
                    string result = HttpGet(QQurl);
                    JObject jo = (JObject)JsonConvert.DeserializeObject(result);
                    if (jo.ContainsKey("openid"))
                    {
                        openid = jo["openid"].ToString();
                    }
                    else
                    {
                        msg.Add("status", 1);
                        msg.Add("msg", "获取个人信息失败");
                    }
                }
                conn = new SqlConnection(connStr);
                conn.Open();
                SqlCommand sqm = null;
                SqlDataReader dr = null;
                HrmResource UBean = null;
                UBean = new HrmResource();
                sql = $"SELECT id,loginid,lastname,password,subcompanyid1,departmentid FROM HrmResource WHERE loginid='{userName}' AND password=UPPER(substring(sys.fn_sqlvarbasetostr(HashBytes('MD5','{userPas}')),3,32)) and ISNULL(loginid,'') <> ''";
                sqm = new SqlCommand(sql, conn);
                dr = sqm.ExecuteReader();
                if (!dr.HasRows)
                {
                    msg.Add("msg", "账号或密码错误");
                    msg.Add("status", 1);
                }
                else
                {
                    while (dr.Read())
                    {
                        UBean.id = (int)dr["id"];

                        if (dr["loginid"] != null)
                        {
                            UBean.loginid = dr["loginid"].ToString();
                        }
                        if (dr["lastname"] != null)
                        {
                            UBean.lastname = dr["lastname"].ToString();
                        }
                        //if (dr["password"] != null)
                        //{
                        //   UBean.password = dr["password"].ToString();
                        //}
                        if (dr["subcompanyid1"] != null)
                        {
                            UBean.subcompanyid1 = long.Parse(dr["subcompanyid1"].ToString());
                        }
                        if (dr["departmentid"] != null)
                        {
                            UBean.departmentid = long.Parse(dr["departmentid"].ToString());
                        }
                        UBean.openid = openid;
                    }

                    //查找微信表内是否绑定
                    sql = $"SELECT a.id,a.requestId,a.WxName,a.WxOpenid,a.FileRoute FROM uf_HR_OAWX a WHERE a.WxOpenid='{openid}'";
                    sqm = new SqlCommand(sql, conn);
                    dr.Close();
                    dr = sqm.ExecuteReader();
                    if (!dr.HasRows)
                    {//没有绑定 插入
                        DateTime dt = DateTime.Now;
                        sql = $"INSERT INTO uf_HR_OAWX(WxName,WxOpenid,OAAccount,modedatacreatedate,modedatacreatetime,formmodeid,modedatacreater,modedatacreatertype)VALUES('{wxName}','{openid}','{UBean.id}','{dt.ToString("yyyy-MM-dd")}','{dt.ToString("HH:mm:ss")}','{135}','{1}','{0}')";
                        sqm.CommandText = sql;
                        dr.Close();
                        sqm.ExecuteNonQuery();
                    }
                    else
                    {
                        while (dr.Read())
                        {
                            if (System.DBNull.Value != dr["FileRoute"])
                            {
                                UBean.FileRoute = dr["FileRoute"].ToString();
                            }
                        }
                    }
                    //UBean.FileRoute = 
                    return JsonConvert.SerializeObject(UBean);
                }
            }
            catch (Exception _e)
            {
                Log.Error("验证登录错误", _e);
            }
            finally
            {
                if (conn != null && conn.State != System.Data.ConnectionState.Closed)
                {
                    conn.Close();
                }
            }
            return msg.ToString();
        }

        [HttpPost]
        public string FrontWebLogin(FormCollection fc)
        {
            string connStr = System.Configuration.ConfigurationManager.AppSettings["connStr"];
            //
            JObject msg = new JObject();
            string loginid = fc["loginid"];
            string password = fc["password"];
            if (string.IsNullOrEmpty(loginid) || string.IsNullOrEmpty(password))
            {
                msg.Add("status",1);
                msg.Add("msg","账号密码为空");
                return msg.ToString();
            }
            SqlConnection conn = null;
            try
            {
                V_OAWXAPPAdmin bean = new V_OAWXAPPAdmin();
                string sql = $"SELECT id,loginid,lastname,password,subcompanyid1,departmentid FROM V_OAWXAPPAdmin WHERE loginid='{loginid}' AND password=UPPER(substring(sys.fn_sqlvarbasetostr(HashBytes('MD5','{password}')),3,32)) and ISNULL(loginid,'') <> ''";
                SqlCommand sqm = null;
                SqlDataReader dr = null;
                conn = new SqlConnection(connStr);
                conn.Open();
                sqm = new SqlCommand(sql, conn);
                dr = sqm.ExecuteReader();
                if (!dr.HasRows)
                {
                    msg.Add("msg","账号或密码错误");
                    msg.Add("status", 1);
                    return msg.ToString();
                }
                else
                {
                    while (dr.Read())
                    {
                        bean.id = (int)dr["id"];
                        if (dr["loginid"] != null)
                        {
                            bean.loginid = dr["loginid"].ToString();
                        }
                        if (dr["lastname"] != null)
                        {
                            bean.lastname = dr["lastname"].ToString();
                        }
                        if (dr["subcompanyid1"] != null)
                        {
                            bean.subcompanyid1 = long.Parse(dr["subcompanyid1"].ToString());
                        }
                        if (dr["departmentid"] != null)
                        {
                            bean.departmentid = long.Parse(dr["departmentid"].ToString());
                        }
                    }
                    msg.Add("status",0);
                    
                    msg.Add("data", JsonConvert.SerializeObject(bean));
                    return msg.ToString();
                }
            }
            catch (Exception _e)
            {
                Log.Error("",_e);
                throw;
            }
            finally
            {
                if (conn != null && conn.State != System.Data.ConnectionState.Closed)
                {
                    conn.Close();
                }
            }
            //V_OAWXAPPAdmin
            return "";
        }
        
        public string getSign(FormCollection fc)
        {
            string loginid = fc["loginid"];
            string WxOpenid = fc["WxOpenid"];
            string FileRoute = fc["FileRoute"];
            string connStr = System.Configuration.ConfigurationManager.AppSettings["connStr"];
            string FtpUserName = System.Configuration.ConfigurationManager.AppSettings["FtpUserName"];
            string FtpPassword = System.Configuration.ConfigurationManager.AppSettings["FtpPassword"];
            HttpFileCollectionBase _files = Request.Files;
            JObject msg = new JObject();
            if (string.IsNullOrEmpty(fc["filename"]))
            {
                return "1";
            }
            SqlConnection conn = null;
            conn = new SqlConnection(connStr);

            try
            {
                string name = fc["filename"] + DateTime.Now.ToString("yyyy-MM-dd_HH_mm_ss") + ".png";
                string data = fc["data"];
                byte[] imageBytes = Convert.FromBase64String(data);
                //MemoryStream ms = new MemoryStream(imageBytes);
                //Bitmap bmp = new Bitmap(ms);
                //string path = Server.MapPath("~/SignImg/") + name;
                //暂时保存在本地
                //bmp.Save(path, System.Drawing.Imaging.ImageFormat.Png);
                //ms.Close();
                string address = UpFile(imageBytes, FileRoute, "1.png", loginid, "ftp://ftp1.changfanz.net/", FtpUserName, FtpPassword);
                //更新数据库图片位置
                //FileRoute
                string sql = $"UPDATE uf_HR_OAWX SET FileRoute='{address}',FileTime='{DateTime.Now}' WHERE WxOpenid='{WxOpenid}'";
                conn.Open();
                SqlCommand sqm = new SqlCommand(sql, conn);
                sqm.ExecuteNonQuery();
                msg.Add("status", "0");
                msg.Add("FileRoute", address);
                return msg.ToString();
            }
            catch (Exception _e)
            {
                Log.Error("上传文件出错", _e);
                throw _e;
            }

        }

        public string SearchSign(FormCollection fc)
        {
            string subcompanyname = fc["subcompanyname"];
            string FileRoute = fc["FileRoute"];
            string lastname = fc["lastname"];
            string connStr = System.Configuration.ConfigurationManager.AppSettings["connStr"];
            SqlConnection conn = null;
            JObject jo = new JObject();
            try
            {
                conn = new SqlConnection(connStr);
                conn.Open();
                SqlCommand sqm = null;
                SqlDataReader dr = null;
                string sql = "SELECT subcompanyname,WxOpenid,WxName,FileRoute,FileTime,Workcode,lastname,loginid FROM V_uf_HR_OAWX";
                //subcompanyname
                //FileRoute
                //lastname
                List<string> contations = new List<string>();
                if (!string.IsNullOrEmpty(subcompanyname))
                {
                    contations.Add($"subcompanyname like '%{subcompanyname}%'");
                }
                if (!string.IsNullOrEmpty(lastname))
                {
                    contations.Add($"lastname like '%{lastname}%'");
                }
                if (!string.IsNullOrEmpty(FileRoute))
                {
                    if (FileRoute == "download")
                    {
                        contations.Add("ISNULL(FileRoute,'') <> '' ");
                    }
                    else if (FileRoute == "downloadNot")//downloadNot
                    {
                        contations.Add("ISNULL(FileRoute,'') = '' ");
                    }
                }
                string WhereSql = "";
                if (contations.Count>0)
                {
                    WhereSql = " WHERE " + string.Join(" AND ", contations);
                }
                sql += WhereSql;
                sqm = new SqlCommand(sql, conn);
                dr = sqm.ExecuteReader();
                List<V_uf_HR_OAWX> beans = new List<V_uf_HR_OAWX>();
                while (dr.Read())
                {
                    V_uf_HR_OAWX bean = new V_uf_HR_OAWX();
                    if (System.DBNull.Value!=dr["subcompanyname"]){
                        bean.subcompanyname = dr["subcompanyname"].ToString();
                    }
                    if (System.DBNull.Value != dr["WxOpenid"])
                    {
                        bean.WxOpenid = dr["WxOpenid"].ToString();
                    }
                    if (System.DBNull.Value != dr["WxName"])
                    {
                        bean.WxName = dr["WxName"].ToString();
                    }
                    if (System.DBNull.Value != dr["FileRoute"])
                    {
                        bean.FileRoute = dr["FileRoute"].ToString();
                    }
                    if (System.DBNull.Value != dr["FileTime"])
                    {
                        bean.FileTime = DateTime.Parse(dr["FileTime"].ToString());
                    }
                    if (System.DBNull.Value != dr["Workcode"])
                    {
                        bean.Workcode = dr["Workcode"].ToString();
                    }
                    if (System.DBNull.Value != dr["lastname"])
                    {
                        bean.lastname = dr["lastname"].ToString();
                    }
                    if (System.DBNull.Value !=dr["loginid"])
                    {
                        bean.loginid = dr["loginid"].ToString();
                    }
                    beans.Add(bean);
                }
                //
                string result = JsonConvert.SerializeObject(beans);
                jo.Add("status",0);
                jo.Add("data",result);
                return jo.ToString();
            }
            catch (Exception _e)
            {
                Log.Error("",_e);
                throw;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string getSignUrl(FormCollection fc)
        {
            string FtpUserName = System.Configuration.ConfigurationManager.AppSettings["FtpUserName"];
            string FtpPassword = System.Configuration.ConfigurationManager.AppSettings["FtpPassword"];
            string ftps_str = fc["Ftps"];
            string loginids_str = fc["loginids"];
            string Names_str = fc["Names"];
            string[] ftps = ftps_str.Split(',');
            string[] loginids = loginids_str.Split(',');
            string[] Names = Names_str.Split(',');
            List<string> urls = new List<string>();
            string url = HttpContext.Request.Url.Host;
            //批量下载ftps到服务器上
            for (int i=0;i< ftps.Length;i++)
            {
                string FileUrl = downFtpImg(ftps[i], FtpUserName, FtpPassword,loginids[i]+".png");
                urls.Add(FileUrl);
            }
            JObject msg = new JObject();
            msg.Add("status",0);
            msg.Add("data",string.Join(",", urls));
            return msg.ToString();
        }

        /// <summary>
        /// HTTP GET方式请求数据.
        /// </summary>
        /// <param name="url">URL.</param>
        /// <returns></returns>
        public string HttpGet(string url)
        {
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(url);
            request.Method = "GET";
            //request.ContentType = "application/x-www-form-urlencoded";
            request.Accept = "*/*";
            request.Timeout = 15000;
            request.AllowAutoRedirect = false;

            WebResponse response = null;
            string responseStr = null;

            try
            {
                response = request.GetResponse();

                if (response != null)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                    responseStr = reader.ReadToEnd();
                    reader.Close();
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                request = null;
                response = null;
            }
            return responseStr;
        }

        /// <summary>
        /// 上传文件
        /// </summary>
        /// <param name="buffer">文件的Byte数组</param>
        /// <param name="FileRoute">要删除掉的文件</param>
        /// <param name="originalName">文件原始名字(带后缀名)</param>
        /// <param name="perStr">新文件名的前缀</param>
        /// <returns></returns>
        public string UpFile(byte[] buffer, string FileRoute, string originalName, string perStr, string uri, string Username, string Password)
        {
            if (buffer == null || buffer.Length <= 0 || string.IsNullOrEmpty(originalName))
            {
                throw new ArgumentException("参数错误！");
            }
            string filePathstr = string.Empty;
            string filepathsql = null;
            try
            {
                string pathstr = perStr;
                filePathstr = "~/OASign/" + pathstr + CreatenTimestamp() + ".png";
                //Stream sr = upfile.PostedFile.InputStream;
                //byte[] file = new byte[sr.Length];
                //sr.Read(file, 0, file.Length);

                StreamWriter sw = new StreamWriter(this.HttpContext.Server.MapPath(filePathstr));
                sw.BaseStream.Write(buffer, 0, buffer.Length);
                sw.Flush();
                sw.Close();
                // file.SaveAs(HttpContext.Current.Server.MapPath(filePathstr));//把文件上传到服务器的绝对路径上

                bool check;
                string ftpPath = "OASign";
                //检查是否存在此目录文件夹
                if (CheckDirectoryExist(uri, ftpPath, Username, Password))
                {
                    //删除文件
                    Delete(FileRoute, uri + "/" + ftpPath, Username, Password);
                    //存在此文件夹就直接上传
                    check = Upload(this.HttpContext.Server.MapPath(filePathstr), uri, ftpPath, Username, Password);
                }
                else
                {

                    MakeDir(uri, ftpPath, Username, Password);//创建
                    //删除文件
                    Delete(FileRoute, uri, Username, Password);
                    check = Upload(this.HttpContext.Server.MapPath(filePathstr), uri, ftpPath, Username, Password);
                }

                //成功就更新
                if (check)
                {
                    filepathsql = pathstr + Path.GetExtension(originalName);
                }

                //检查是否存在此文件
                if (System.IO.File.Exists(this.HttpContext.Server.MapPath(filePathstr)))
                {
                    System.IO.File.Delete(this.HttpContext.Server.MapPath(filePathstr));
                }
                //uri
                return uri + filePathstr;
            }
            catch (Exception _e)
            {
                System.IO.File.Delete(this.HttpContext.Server.MapPath(filePathstr));
                throw;
            }
        }

        

        /// <summary>
        /// 获得一个传入的文件名，得到其后缀
        /// </summary>
        /// <returns></returns>
        public string getFileSuf(string FileName)
        {
            return FileName.Substring(FileName.LastIndexOf("."));
        }


        /// <summary>
        /// 检查目录是否存在
        /// </summary>
        /// <param name="ftpPath">要检查的目录的路径</param>
        /// <param name="dirName">要检查的目录名</param>
        /// <returns>存在返回true，否则false</returns>
        public bool CheckDirectoryExist(string ftpPath, string dirName, string username, string password)
        {
            bool result = false;
            try
            {

                //实例化FTP连接
                FtpWebRequest request = (FtpWebRequest)FtpWebRequest.Create(new Uri(ftpPath));
                // ftp用户名和密码
                request.Credentials = new NetworkCredential(username, password);
                request.KeepAlive = false;
                //指定FTP操作类型为创建目录
                request.Method = WebRequestMethods.Ftp.ListDirectoryDetails;
                //获取FTP服务器的响应
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.Default);
                StringBuilder str = new StringBuilder();
                string line = sr.ReadLine();
                while (line != null)
                {
                    str.Append(line);
                    str.Append("|");
                    line = sr.ReadLine();
                }
                string[] datas = str.ToString().Split('|');

                for (int i = 0; i < datas.Length; i++)
                {
                    if (datas[i].Contains("<DIR>"))
                    {
                        int index = datas[i].IndexOf("<DIR>");
                        string name = datas[i].Substring(index + 5).Trim();
                        if (name == dirName)
                        {
                            result = true;
                            break;
                        }
                    }
                }

                sr.Close();
                sr.Dispose();
                response.Close();
            }
            catch (Exception)
            {
                return false;
            }
            return result;
        }

        /// <summary>
        /// FTP上传文件
        /// </summary>
        /// <param name="filename">上传文件路径</param>
        /// <param name="ftpServerIP">FTP服务器的IP和端口</param>
        /// <param name="ftpPath">FTP服务器下的哪个目录</param>
        /// <param name="ftpUserID">FTP用户名</param>
        /// <param name="ftpPassword">FTP密码</param>
        public bool Upload(string filename, string ftpServerIP, string ftpPath, string ftpUserID, string ftpPassword)
        {
            FileInfo fileInf = new FileInfo(filename);
            string uri = ftpServerIP + "/" + ftpPath + "/" + fileInf.Name;

            try
            {
                FtpWebRequest reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(uri));
                // ftp用户名和密码
                reqFTP.Credentials = new NetworkCredential(ftpUserID, ftpPassword);
                reqFTP.KeepAlive = false;

                // 指定执行什么命令
                reqFTP.Method = WebRequestMethods.Ftp.UploadFile;

                // 指定数据传输类型
                reqFTP.UseBinary = true;

                // 上传文件时通知服务器文件的大小
                reqFTP.ContentLength = fileInf.Length;

                //this.Invoke(InitUProgress, fileInf.Length);

                // 缓冲大小设置为2kb
                int buffLength = 4096;

                byte[] buff = new byte[buffLength];
                int contentLen;

                // 打开一个文件流 (System.IO.FileStream) 去读上传的文件
                FileStream fs = fileInf.OpenRead();

                // 把上传的文件写入流
                Stream strm = reqFTP.GetRequestStream();
                contentLen = fs.Read(buff, 0, buffLength);
                while (contentLen != 0)
                {
                    strm.Write(buff, 0, contentLen);
                    contentLen = fs.Read(buff, 0, buffLength);
                }

                // 关闭两个流
                strm.Close();
                strm.Dispose();
                fs.Close();
                fs.Dispose();

                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        /// <summary>
        /// 新建目录
        /// </summary>
        /// <param name="ftpPath"></param>
        /// <param name="dirName"></param>
        public void MakeDir(string ftpPath, string dirName, string username, string password)
        {
            try
            {

                //实例化FTP连接
                FtpWebRequest request = (FtpWebRequest)FtpWebRequest.Create(new Uri(ftpPath + dirName));

                // ftp用户名和密码
                request.Credentials = new NetworkCredential(username, password);

                // 默认为true，连接不会被关闭

                request.KeepAlive = false;

                //指定FTP操作类型为创建目录
                request.Method = WebRequestMethods.Ftp.MakeDirectory;
                //获取FTP服务器的响应
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                response.Close();
            }
            catch (Exception ex)
            {
                //Respons
            }
        }

        public void Delete(string fileName, string uri, string username, string password)
        {
            try
            {
                uri = fileName;
                FtpWebRequest reqFTP;
                reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri(uri));

                reqFTP.Credentials = new NetworkCredential(username, password);
                reqFTP.KeepAlive = false;
                reqFTP.Method = WebRequestMethods.Ftp.DeleteFile;

                string result = String.Empty;
                FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
                long size = response.ContentLength;
                Stream datastream = response.GetResponseStream();
                StreamReader sr = new StreamReader(datastream);
                result = sr.ReadToEnd();
                sr.Close();
                datastream.Close();
                response.Close();
                //Buffer.Log(string.Format("Ftp文件{1}删除成功！", DateTime.Now.ToString(), fileName));
            }
            catch (Exception ex)
            {
            }
        }

        public static long CreatenTimestamp()
        {
            long rd = new Random(1000000).Next();
            return (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000 + rd;
        }

        /// <summary>
        /// 下载FTP文件到本地
        /// </summary>
        /// <param name="uri"></param>
        /// <param name="FtpFileName">远程要下载文件数组要与Names一一对应</param>
        /// <param name="UserName"></param>
        /// <param name="Password"></param>
        /// <param name="Name">要保存本地文件名数组</param>
        /// <returns></returns>
        public string downFtpImg(string uri,string UserName,string Password,string Name)
        {
            Stream responseStream = null;
            Bitmap bmp = null;
            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(uri);
                //设置请求的方法是FTP文件下载
                request.Method = WebRequestMethods.Ftp.DownloadFile;
                //连接登录FTP服务器
                request.Credentials = new NetworkCredential(UserName, Password);
                //获取一个请求响应对象
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                //获取请求的响应流
                responseStream = response.GetResponseStream();
                //判断本地文件是否存在，如果存在则删除
                string FileNameUrl = this.Server.MapPath("~/sign/SignTmp") + "/";
                string FileName = FileNameUrl + Name;
                if (System.IO.File.Exists(FileName))
                {
                    System.IO.File.Delete(FileName);
                }
                bmp = new Bitmap(response.GetResponseStream());
                //bmp.RotateFlip(RotateFlipType.Rotate270FlipNone);
                bmp.Save(FileName, System.Drawing.Imaging.ImageFormat.Png);
                
                return "/sign/SignTmp/" + Name;
            }
            catch (Exception _e)
            {
                Log.Error("",_e);
                throw;
            }
            finally
            {
                if (bmp!=null)
                {
                    bmp.Dispose();
                }
                if (responseStream!=null)
                {
                    responseStream.Close();
                }
            }
        }

    }
}