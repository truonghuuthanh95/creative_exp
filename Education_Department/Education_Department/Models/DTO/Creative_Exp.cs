namespace Education_Department.Models.DTO
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Creative_Exp : DbContext
    {
        public Creative_Exp()
            : base("name=Creative_Exp_V3")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<Day_Type_Enable> Day_Type_Enable { get; set; }
        public virtual DbSet<Day_Type_Enable_Section_A_Day> Day_Type_Enable_Section_A_Day { get; set; }
        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<Person_Reponsibility> Person_Reponsibility { get; set; }
        public virtual DbSet<Position> Positions { get; set; }
        public virtual DbSet<Program> Programs { get; set; }
        public virtual DbSet<Program_Required_District> Program_Required_District { get; set; }
        public virtual DbSet<Program_Required_School_Degree> Program_Required_School_Degree { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<Registration_Creative_Exp> Registration_Creative_Exp { get; set; }
        public virtual DbSet<School> Schools { get; set; }
        public virtual DbSet<School_Degee> School_Degee { get; set; }
        public virtual DbSet<School_Type> School_Type { get; set; }
        public virtual DbSet<Session_A_Day> Session_A_Day { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Class>()
                .HasMany(e => e.Registration_Creative_Exp)
                .WithOptional(e => e.Class)
                .HasForeignKey(e => e.class_id);

            modelBuilder.Entity<Day_Type_Enable>()
                .HasMany(e => e.Day_Type_Enable_Section_A_Day)
                .WithOptional(e => e.Day_Type_Enable1)
                .HasForeignKey(e => e.day_type_enable);

            modelBuilder.Entity<Day_Type_Enable>()
                .HasMany(e => e.Programs)
                .WithOptional(e => e.Day_Type_Enable)
                .HasForeignKey(e => e.day_type_enable_select_id);

            modelBuilder.Entity<District>()
                .HasMany(e => e.Program_Required_District)
                .WithOptional(e => e.District)
                .HasForeignKey(e => e.district_id);

            modelBuilder.Entity<District>()
                .HasMany(e => e.Schools)
                .WithOptional(e => e.District)
                .HasForeignKey(e => e.district_id);

            modelBuilder.Entity<Position>()
                .Property(e => e.notation)
                .IsFixedLength();

            modelBuilder.Entity<Position>()
                .HasMany(e => e.Registration_Creative_Exp)
                .WithOptional(e => e.Position)
                .HasForeignKey(e => e.position_id);

            modelBuilder.Entity<Program>()
                .HasMany(e => e.Program_Required_District)
                .WithOptional(e => e.Program)
                .HasForeignKey(e => e.program_id);

            modelBuilder.Entity<Program>()
                .HasMany(e => e.Program_Required_School_Degree)
                .WithOptional(e => e.Program)
                .HasForeignKey(e => e.program_id);

            modelBuilder.Entity<Program>()
                .HasMany(e => e.Registration_Creative_Exp)
                .WithOptional(e => e.Program)
                .HasForeignKey(e => e.program_id);

            modelBuilder.Entity<School>()
                .HasMany(e => e.Person_Reponsibility)
                .WithOptional(e => e.School)
                .HasForeignKey(e => e.school_id);

            modelBuilder.Entity<School>()
                .HasMany(e => e.Registration_Creative_Exp)
                .WithOptional(e => e.School)
                .HasForeignKey(e => e.school_id);

            modelBuilder.Entity<School_Degee>()
                .HasMany(e => e.Classes)
                .WithOptional(e => e.School_Degee)
                .HasForeignKey(e => e.school_degree_id);

            modelBuilder.Entity<School_Degee>()
                .HasMany(e => e.Program_Required_School_Degree)
                .WithOptional(e => e.School_Degee)
                .HasForeignKey(e => e.school_degree_id);

            modelBuilder.Entity<School_Degee>()
                .HasMany(e => e.Schools)
                .WithOptional(e => e.School_Degee)
                .HasForeignKey(e => e.school_type);

            modelBuilder.Entity<School_Type>()
                .HasMany(e => e.Schools)
                .WithOptional(e => e.School_Type1)
                .HasForeignKey(e => e.school_degree_id);

            modelBuilder.Entity<Session_A_Day>()
                .HasMany(e => e.Day_Type_Enable_Section_A_Day)
                .WithOptional(e => e.Session_A_Day)
                .HasForeignKey(e => e.section_a_day_id);

            modelBuilder.Entity<Session_A_Day>()
                .HasMany(e => e.Registration_Creative_Exp)
                .WithOptional(e => e.Session_A_Day)
                .HasForeignKey(e => e.day_session_id);
        }
    }
}
