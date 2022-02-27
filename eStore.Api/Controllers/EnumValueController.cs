using eStore.Lib.DataHelpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class EnumValueController : ControllerBase
    {
        [HttpGet]
        [Route("accounttype")]
        public ActionResult GetAccountTypeLevels()
        {
            return Ok(EnumExtensions.GetValues<AccountType>());
        }

        [HttpGet]
        [Route("paymentmode")]
        public ActionResult GetPaymentModeTypes()
        {
            return Ok(EnumExtensions.GetValues<PaymentMode>());
        }

        [HttpGet]
        [Route("paymode")]
        public ActionResult GetPayModeTypes()
        {
            return Ok(EnumExtensions.GetValues<PayMode>());
        }

        [HttpGet]
        [Route("attendanceunit")]
        public ActionResult GetAttendanceTypes()
        {
            return Ok(EnumExtensions.GetValues<AttUnit>());
        }

        [HttpGet]
        [Route("employeetype")]
        public ActionResult GetEmployeeTypes()
        {
            return Ok(EnumExtensions.GetValues<EmpType>());
        }

        [HttpGet]
        [Route("ledgerentrytype")]
        public ActionResult GetLedgerEntryType()
        {
            return Ok(EnumExtensions.GetValues<LedgerEntryType>());
        }

        [HttpGet]
        [Route("ledgercategorytype")]
        public ActionResult GetLedgerCategoryType()
        {
            return Ok(EnumExtensions.GetValues<LedgerCategory>());
        }

        [HttpGet]
        [Route("taxtype")]
        public ActionResult GetTaxType()
        {
            return Ok(EnumExtensions.GetValues<TaxType>());
        }

        [HttpGet]
        [Route("genders")]
        public ActionResult GetGenders()
        {
            return Ok(EnumExtensions.GetValues<Gender>());
        }

        [HttpGet]
        [Route("connectiontype")]
        public ActionResult GetConnectionType()
        {
            return Ok(EnumExtensions.GetValues<ConnectionType>());
        }

        [HttpGet]
        [Route("renttype")]
        public ActionResult GetRentType()
        {
            return Ok(EnumExtensions.GetValues<RentType>());
        }

        [HttpGet]
        [Route("units")]
        public ActionResult GetUnits()
        {
            return Ok(EnumExtensions.GetValues<Unit>());
        }

        [HttpGet]
        [Route("sizes")]
        public ActionResult GetSizes()
        {
            return Ok(EnumExtensions.GetValues<Size>());
        }

        [HttpGet]
        [Route("productcategory")]
        public ActionResult GetProductCategory()
        {
            return Ok(EnumExtensions.GetValues<ProductCategory>());
        }

        [HttpGet]
        [Route("entrystatus")]
        public ActionResult GetEntryStatus()
        {
            return Ok(EnumExtensions.GetValues<EntryStatus>());
        }

        [HttpGet]
        [Route("cardmodes")]
        public ActionResult GetCardModes()
        {
            return Ok(EnumExtensions.GetValues<CardMode>());
        }

        [HttpGet]
        [Route("cardtype")]
        public ActionResult GetCardType()
        {
            return Ok(EnumExtensions.GetValues<CardType>());
        }

        [HttpGet]
        [Route("vpaymode")]
        public ActionResult GetVPayMode()
        {
            return Ok(EnumExtensions.GetValues<VPayMode>());
        }

        [HttpGet]
        [Route("salarycomponets")]
        public ActionResult GetSalaryComponets()
        {
            return Ok(EnumExtensions.GetValues<SalaryComponet>());
        }

        [HttpGet]
        [Route("bankpaymode")]
        public ActionResult GetBankPayModes()
        {
            return Ok(EnumExtensions.GetValues<BankPayMode>());
        }

        [HttpGet]
        [Route("mixpaymode")]
        public ActionResult GetMixPayMode()
        {
            return Ok(EnumExtensions.GetValues<MixPaymentMode>());
        }

        [HttpGet]
        [Route("vochertype")]
        public ActionResult GetVoucherType()
        {
            return Ok(EnumExtensions.GetValues<VoucherType>());
        }

        [HttpGet]
        [Route("loginrole")]
        public ActionResult GetLoginRoles()
        {
            return Ok(EnumExtensions.GetValues<LoginRole>());
        }

        [HttpGet]
        [Route("arvindaccounts")]
        public ActionResult GetArvindAccounts()
        {
            return Ok(EnumExtensions.GetValues<ArvindAccount>());
        }

        [HttpGet]
        [Route("UploadTypes")]
        public ActionResult GetUploadTypes() => Ok(EnumExtensions.GetValues<UploadType>());

        [HttpGet]
        [Route("HolidayReasons")]
        public ActionResult GetHolidayReason() => Ok(EnumExtensions.GetValues<HolidayReason>());
    }
}