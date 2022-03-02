using System;
using System.IO;

namespace eStore.Reports.Pdfs
{
	public class ReportPDFGenerator
	{
		public ReportPDFGenerator()
		{
		}

		public string IsExist(string fileName)
		{
			//string fileName = $"FinReport_{repName}_{StartYear}_{EndYear}.pdf";
			if (File.Exists(fileName))
				return fileName;
			else
				return "ERROR";
		}
		/// <summary>
		/// List PDF File in working directory
		/// </summary>
		/// <returns></returns>
		public string[] FileListPDF()
		{
			string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
			return filePaths;
		}
		/// <summary>
		/// Delete all pdf file from working directory except filename provided as parameter.
		/// </summary>
		/// <param name="fileName">PDF Filename which need to be ignored</param>
		/// <returns></returns>
		public bool FileCleanUp(string fileName)
		{
			string[] filePaths = Directory.GetFiles(Directory.GetCurrentDirectory(), "*.pdf");
			foreach (var item in filePaths)
				if (!item.Contains(fileName))
					File.Delete(item);
			return true;
		}
		public void CreatePDF() { }
		public void AddParagraph() { }
		public void GenerateTable() { }
		public void AddPageNumber() { }

		public void PrintPdf() { }
	}
}

