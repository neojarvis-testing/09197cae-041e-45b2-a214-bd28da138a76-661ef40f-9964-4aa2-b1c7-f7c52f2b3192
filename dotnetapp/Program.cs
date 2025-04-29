using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<FeedbackService>();
builder.Services.AddScoped<EventRequirementService>();
builder.Services.AddScoped<EventService>();

builder.Services.AddScoped<IAuthService, AuthService>();//changes made using copilot

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("myConnection")));




builder.Services.AddCors(opttions=>{

    opttions.AddDefaultPolicy(builder=>{

        builder.AllowAnyOrigin()

        .AllowAnyHeader()

        .AllowAnyMethod();

    });

});



// var key=Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);

// builder.Services.AddAuthentication(x=>{

//     x.DefaultAuthenticateScheme=JwtBearerDefaults.AuthenticationScheme;

//     x.DefaultChallengeScheme=JwtBearerDefaults.AuthenticationScheme;

// }).AddJwtBearer(x=>{

//     x.RequireHttpsMetadata=false;

//     x.SaveToken=true;

//     x.TokenValidationParameters=new TokenValidationParameters{

//         ValidateIssuer=true,

//         ValidateAudience=true,

//         ValidateIssuerSigningKey=true,

//         ValidIssuer=builder.Configuration["Jwt:Issuer"],

//         ValidAudience=builder.Configuration["Jwt:Issuer"],

//         IssuerSigningKey=new SymmetricSecurityKey(key)

//     };

// });

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, // Set true if using Issuer
        ValidateAudience = false, // Set true if using Audience
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])) // Same key as GenerateToken
    };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
