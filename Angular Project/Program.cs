using Angular_Project.Models;
using Angular_Project.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Angular_Project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppleStoreContext>(options =>
                           options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("AppleCon")));

            builder.Services.AddScoped(typeof(GenericRepository<Product>));
            builder.Services.AddScoped(typeof(GenericRepository<User>));

            builder.Services.AddAuthentication(option =>
            option.DefaultAuthenticateScheme = "myscheme").AddJwtBearer("myscheme",
            op => {

                string key = "Angular project Key using real Api Powerd By Shadiii";
                var SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
                op.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = SecurityKey
                };
            });

            // Add CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAllOrigins"); // Use CORS middleware

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
