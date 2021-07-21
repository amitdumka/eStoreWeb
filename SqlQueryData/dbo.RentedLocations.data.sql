SET IDENTITY_INSERT [dbo].[RentedLocations] ON
INSERT INTO [dbo].[RentedLocations] ([RentedLocationId], [PlaceName], [Address], [OnDate], [VacatedDate], [City], [OwnerName], [MobileNo], [RentAmount], [AdvanceAmount], [IsRented], [RentType], [UserId], [IsReadOnly], [StoreId]) VALUES (1, N'Tailoring Workshop', N'Bhagalpur Road Dumka, Jharkhand 814101', N'2021-02-23 00:00:00', N'2021-02-23 00:00:00', N'Dumka', N'Amit Kumar', N'09831213339', CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), 1, 0, N'GeetanjaliKumariVerma', 0, 1)
SET IDENTITY_INSERT [dbo].[RentedLocations] OFF
