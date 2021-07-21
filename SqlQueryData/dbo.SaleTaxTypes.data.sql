SET IDENTITY_INSERT [dbo].[SaleTaxTypes] ON
INSERT INTO [dbo].[SaleTaxTypes] ([SaleTaxTypeId], [TaxName], [TaxType], [CompositeRate]) VALUES (1, N'Local Output GST@ 5%  ', 0, CAST(5.0000 AS Money))
INSERT INTO [dbo].[SaleTaxTypes] ([SaleTaxTypeId], [TaxName], [TaxType], [CompositeRate]) VALUES (2, N'Local Output GST@ 12%  ', 0, CAST(12.0000 AS Money))
INSERT INTO [dbo].[SaleTaxTypes] ([SaleTaxTypeId], [TaxName], [TaxType], [CompositeRate]) VALUES (3, N'Output IGST@ 5%  ', 3, CAST(5.0000 AS Money))
INSERT INTO [dbo].[SaleTaxTypes] ([SaleTaxTypeId], [TaxName], [TaxType], [CompositeRate]) VALUES (4, N'Output IGST@ 12%  ', 3, CAST(12.0000 AS Money))
INSERT INTO [dbo].[SaleTaxTypes] ([SaleTaxTypeId], [TaxName], [TaxType], [CompositeRate]) VALUES (5, N'Output Vat@ 12%  ', 4, CAST(5.0000 AS Money))
INSERT INTO [dbo].[SaleTaxTypes] ([SaleTaxTypeId], [TaxName], [TaxType], [CompositeRate]) VALUES (6, N'Output VAT@ 5%  ', 4, CAST(12.0000 AS Money))
INSERT INTO [dbo].[SaleTaxTypes] ([SaleTaxTypeId], [TaxName], [TaxType], [CompositeRate]) VALUES (7, N'Output Vat Free  ', 4, CAST(5.0000 AS Money))
SET IDENTITY_INSERT [dbo].[SaleTaxTypes] OFF
