using ClosedXML.Excel;
using eStore.Database;
using eStore.Shared.Models.Banking;
using eStore.Shared.ViewModels.Banking;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace eStore.BL.Importer
{
    public class XSReader
    {
        public XLWorkbook WB { get; private set; }
        protected IXLWorksheet TocWS { get; set; }
        public string FilePath { get; private set; }
        public string WorkBookName { get; private set; }
        public List<string> SheetNames { get; private set; }

        public XSReader(string path)
        {
            this.WB = Load(path);
            FilePath = path;
        }

        protected int Row = 9, SN = 0;

        private XLWorkbook Load(string path)
        {
            var WBs = new XLWorkbook(path);
            Console.WriteLine("Count: " + WBs.Worksheets.Count);
            this.WB = WBs;
            this.LoadTOC();
            return WBs;
        }

        protected void TOC(string TName, string Rem = "Uploaded")
        {
            TocWS.Cell(Row, 6).Value = (++SN);
            TocWS.Cell(Row, 7).Value = TName;
            TocWS.Cell(Row, 8).Value = Rem;
            TocWS.Cell(Row, 9).Value = DateTime.Now;
            Row++;
        }

        public IXLWorksheet GetWS(string wsName)
        {
            if (WB != null)
                return WB.Worksheet(wsName);
            else
                throw new Exception();
        }

        public int GetCount()
        {
            return WB.Worksheets.Count;
        }

        private void LoadTOC()
        {
            if (GetCount() > 0)
            {
                var ws = GetWS("TableOfContent");

                this.WorkBookName = ws.Cell(4, 4).Value.ToString();
                var nonEmptyDataRows = ws.RowsUsed();
                SheetNames = new List<string>();
                foreach (var dR in nonEmptyDataRows)
                {
                    //for row number check
                    if (dR.RowNumber() >= Row)
                    {
                        SheetNames.Add(dR.Cell(2).Value.ToString());
                    }
                }
            }
            else
            {
                throw new NullReferenceException();
            }
        }

        public static DataTable ReadSheetToDt(IXLWorksheet ws, int HeaderRow)
        {
            DataTable dt = new DataTable();
            //Loop through the Worksheet rows.
            bool firstRow = true;
            string readRange = "1:1";
            foreach (IXLRow row in ws.RowsUsed())
            {
                if (row.RowNumber() >= HeaderRow)
                {
                    if (firstRow)
                    {
                        //Checking the Last cellused for column generation in datatable
                        readRange = string.Format("{0}:{1}", 1, row.LastCellUsed().Address.ColumnNumber);
                        foreach (IXLCell cell in row.Cells(readRange))
                        {
                            dt.Columns.Add(cell.Value.ToString());
                        }
                        firstRow = false;
                    }
                    else
                    {
                        //Add rows to DataTable.
                        dt.Rows.Add();
                        int i = 0;
                        foreach (IXLCell cell in row.Cells(readRange))
                        {
                            dt.Rows[dt.Rows.Count - 1][i] = cell.Value;
                            i++;
                        }
                    }
                }
            }

            return dt;
        }
    }

    public class BankImporter
    {
        private XSReader xS;
        private eStoreDbContext db;

        public BankImporter(eStoreDbContext dbContext)
        {
            db = dbContext;
        }

        public async System.Threading.Tasks.Task ReadAsync(string fileName)
        {
            xS = new XSReader(fileName);

            if (xS.WorkBookName == "Bank")
            {
                await AddBankAsync();
                await AddBankAccountAsync();
                await AddBankDepositAsync();
                await AddBankWithdrawalAsync();
            }
            else
            {
                throw new Exception();
            }
        }

        public async System.Threading.Tasks.Task ReadAsync(XSReader xs)
        {
            // xS = new XSReader(fileName);
            xS = xs;

            if (xS != null && xS.WorkBookName == "Bank")
            {
                await AddBankAsync();
                await AddBankAccountAsync();
                await AddBankDepositAsync();
                await AddBankWithdrawalAsync();
            }
            else
            {
                throw new Exception();
            }
        }

        private async System.Threading.Tasks.Task AddBankAsync()
        {
            var ws = xS.GetWS("Banks");
            var nonEmptyDataRows = ws.RowsUsed();
            int Row = 6;//Title;
            foreach (var dR in nonEmptyDataRows)
            {
                if (dR.RowNumber() > Row)
                {
                    Bank bank = new Bank
                    {
                        BankId = dR.Cell(1).GetValue<int>(),
                        BankName = dR.Cell(2).Value.ToString()
                    };

                    if (!db.Banks.Contains(bank))
                        await db.Banks.AddAsync(bank);
                }
            }

            await db.SaveChangesAsync();
            ;
        }

        private async System.Threading.Tasks.Task AddBankAccountAsync()
        {
            var ws = xS.GetWS("BankAccounts");
            var nonEmptyDataRows = ws.RowsUsed();
            int Row = 6;//Title;
            foreach (var dR in nonEmptyDataRows)
            {
                if (dR.RowNumber() > Row)
                {
                    BankAccount bank = new BankAccount
                    {
                        BankAccountId = dR.Cell(1).GetValue<int>(),
                        BankId = dR.Cell(2).GetValue<int>(),
                        Account = dR.Cell(3).GetValue<string>(),
                        AccountType = dR.Cell(4).GetValue<AccountType>(),
                        BranchName = dR.Cell(5).GetValue<string>()
                    };

                    if (!db.BankAccounts.Contains(bank))
                        await db.BankAccounts.AddAsync(bank);
                }
            }

            await db.SaveChangesAsync();
            ;
        }

        private async System.Threading.Tasks.Task AddBankDepositAsync()
        {
            var ws = xS.GetWS("BankAccounts");
            var nonEmptyDataRows = ws.RowsUsed();
            int Row = 6;//Title;
            foreach (var dR in nonEmptyDataRows)
            {
                if (dR.RowNumber() > Row)
                {
                    BankDeposit bank = new BankDeposit
                    {
                        BankDepositId = dR.Cell(1).GetValue<int>(),
                        BankAccountId = dR.Cell(2).GetValue<int>(),
                        Amount = dR.Cell(3).GetValue<decimal>(),
                        ChequeNo = dR.Cell(4).GetValue<string>(),
                        Details = dR.Cell(4).GetValue<string>(),
                        InNameOf = dR.Cell(4).GetValue<string>(),
                        IsInHouse = dR.Cell(4).GetBoolean(),
                        Remarks = dR.Cell(4).GetValue<string>(),
                        StoreId = dR.Cell(4).GetValue<int>(),
                        OnDate = dR.Cell(5).GetDateTime().Date,
                        PayMode = dR.Cell(4).GetValue<PaymentMode>()
                    };

                    if (!db.BankDeposits.Contains(bank))
                        await db.BankDeposits.AddAsync(bank);
                }
            }

            await db.SaveChangesAsync();
            ;
        }

        private async System.Threading.Tasks.Task AddBankWithdrawalAsync()
        {
            var ws = xS.GetWS("BankWithDrawals");
            var nonEmptyDataRows = ws.RowsUsed();
            int Row = 6;//Title;
            foreach (var dR in nonEmptyDataRows)
            {
                if (dR.RowNumber() > Row)
                {
                    BankWithdrawal bank = new BankWithdrawal
                    {
                        BankWithdrawalId = dR.Cell(1).GetValue<int>(),
                        BankAccountId = dR.Cell(2).GetValue<int>(),
                        Amount = dR.Cell(3).GetValue<decimal>(),
                        ChequeNo = dR.Cell(4).GetValue<string>(),
                        Details = dR.Cell(4).GetValue<string>(),
                        InNameOf = dR.Cell(4).GetValue<string>(),
                        Remarks = dR.Cell(4).GetValue<string>(),
                        StoreId = dR.Cell(4).GetValue<int>(),
                        OnDate = dR.Cell(5).GetDateTime().Date,
                        PayMode = dR.Cell(4).GetValue<PaymentMode>(),
                        ApprovedBy = dR.Cell(4).GetValue<string>(),
                        SignedBy = dR.Cell(4).GetValue<string>()
                    };

                    if (!db.BankWithdrawals.Contains(bank))
                        await db.BankWithdrawals.AddAsync(bank);
                }
            }

            await db.SaveChangesAsync();
            ;
        }
    }
}