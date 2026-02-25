using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.MapOpenApi();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "v1");
});

(int id, string type)[] machines =
[
    (1, "A"), 
    (16, "M"), 
    (124, "B"),
    (6512, "B"), 
    (62010, "M")
];

var productIds = new[]
{
    3,
    51,
    651,
    8122,
    20421
};

app.MapGet("/machines/overview", () =>
{
    int total = new Random().Next(10, 100);
    int needsRepair = new Random().Next(1, total / 5);
    int working = total - needsRepair;
    int lowSupply = new Random().Next(1, working / 2);

    return new VendingMachinesOverview(total, working, lowSupply, needsRepair);
})
.WithName("GetVendingMachinesOverview");

app.MapGet("/sales/index-by-historic-avg", () =>
    machines.Select(x => new SalesIndex(x.id, x.type, new Random().Next(1, 100)))
    .OrderBy(x => x.percentage).ToArray()
).WithName("GetSalesIndexByHistoricAverage");

app.MapGet("/machines/product-fill", () =>
{
    int max = 10000;

    var vmItemFills = machines.Select(x =>
    {
        int itemCount = new Random().Next(1, max);
        return new VendingMachineItemFill(itemCount, itemCount * 100 / max);
    }).OrderBy(x => x.fillPercentage).ToArray();

    return new VendingMachinesItemFillOverview(vmItemFills.Sum(x => x.itemCount), vmItemFills);
}).WithName("GetVendingMachinesProductFill");

app.MapGet("/machines/money-fill", () =>
    machines.Select(x => new VendingMachineMoneyStatus(x.id, x.type, new Random().Next(1, 100), new Random().Next(1, 100)))
    .OrderByDescending(x => x.coinFillPercentage + x.banknotesFillPercentage).ToArray()
).WithName("GetVendingMachinesMoneyFill");

app.MapGet("/sales/by-vending-machine", () =>
{
    int totalSales = new Random().Next(1000, 10000);

    int max = totalSales / 5;
    var topVmSales = machines.Select(x =>
    {
        int sold = new Random().Next(100, max);
        return new VendingMachineTotalSales(sold, sold * 100 / totalSales);
    }).OrderByDescending(x => x.totalSales).ToArray();

    return new VendingMachinesTotalSalesOverview(totalSales, topVmSales.Sum(x => x.totalSales), topVmSales);
}).WithName("GetSalesByVendingMachinesOverview");

app.MapGet("/sales/by-product-type", () =>
{
    int totalSold = new Random().Next(10_000, 100_000);

    int max = totalSold / 8;
    var topProductSales = productIds.Select(x =>
    {
        int sold = new Random().Next(1000, max);
        return new ProductTotalSales(x, new Random().Next(1, 5), sold, sold * 100 / totalSold);
    }).OrderByDescending(x => x.soldTotal).ToArray();

    return new ProductsTotalSalesOverview(totalSold, topProductSales.Sum(x => x.soldTotal), topProductSales.DistinctBy(x => x.category).Count(), topProductSales);
}).WithName("GetSalesByProductType");

app.MapGet("/sales/peak-sale-count-per-day", () =>
    Enumerable.Range(1, 31).Select(x => new PeakSaleTimeAtDay(x, GetRandomTimeOfDay()))
);

app.Run();

TimeSpan GetRandomTimeOfDay()
{
    var rng = new Random();

    int hour = rng.Next(0, 24);
    int minute = rng.Next(0, 60);
    int second = rng.Next(0, 60);

    return new TimeSpan(hour, minute, 0);
}

internal record VendingMachinesOverview(int total, int working, int lowSupply, int needsRepair);

internal record SalesIndex(int machineId, string machineType, int percentage);

internal record VendingMachineItemFill(int itemCount, int fillPercentage);

internal record VendingMachinesItemFillOverview(int total, VendingMachineItemFill[] topFilled);

internal record VendingMachineMoneyStatus(int machineId, string machineType, int coinFillPercentage, int banknotesFillPercentage);

internal record VendingMachineTotalSales(int totalSales, int percentageOfAllSales);

internal record VendingMachinesTotalSalesOverview(int totalSales, int soldInTopFive, VendingMachineTotalSales[] topVendingMachines);

internal record ProductTotalSales(int productId, [field: JsonIgnore] int category, int soldTotal, int percentageOfAllSales);

internal record ProductsTotalSalesOverview(int totalSold, int soldInTopFive, int differentProductCategoriesCount, ProductTotalSales[] topProducts);

internal record PeakSaleTimeAtDay(int day, TimeSpan peakSalesTime);
