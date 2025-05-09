// using dotnetapp.Models;
// using Microsoft.EntityFrameworkCore;


// namespace dotnetapp.Data
// {
//     public class ApplicationDbContext: DbContext
//     {
//         public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options):base(options){}
//         public ApplicationDbContext(){}

//         public DbSet<User> Users{get;set;}
//         public DbSet<Event> Events{get;set;}
//         public DbSet<Feedback> Feedbacks{get;set;}
//         public DbSet<EventRequirement> EventRequirements{get;set;}
//     }
// }


using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Data
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options):base(options){}
        public ApplicationDbContext(){}

        public DbSet<User> Users{get;set;}
        public DbSet<Event> Events{get;set;}
        public DbSet<Feedback> Feedbacks{get;set;}
        public DbSet<EventRequirement> EventRequirements{get;set;}
    }
}