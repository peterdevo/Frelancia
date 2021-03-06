// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20211013192316_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.11");

            modelBuilder.Entity("Domain.JobLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("JobProfileId")
                        .HasColumnType("TEXT");

                    b.Property<string>("URL")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("JobProfileId");

                    b.ToTable("JobLinks");
                });

            modelBuilder.Entity("Domain.JobProfile", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Niche")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("JobProfiles");
                });

            modelBuilder.Entity("Domain.JobLink", b =>
                {
                    b.HasOne("Domain.JobProfile", "JobProfile")
                        .WithMany("JobLinks")
                        .HasForeignKey("JobProfileId");

                    b.Navigation("JobProfile");
                });

            modelBuilder.Entity("Domain.JobProfile", b =>
                {
                    b.Navigation("JobLinks");
                });
#pragma warning restore 612, 618
        }
    }
}
