﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20211028101715_ChangeSingleJobToIcollectionofJobs")]
    partial class ChangeSingleJobToIcollectionofJobs
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.11");

            modelBuilder.Entity("Domain.Job", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Introduction")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsShared")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("JobProfileId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("JobProfileId");

                    b.ToTable("Jobs");
                });

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

                    b.Property<int>("NicheId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Photos")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NicheId");

                    b.ToTable("JobProfiles");
                });

            modelBuilder.Entity("Domain.Niche", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Niches");
                });

            modelBuilder.Entity("Domain.Job", b =>
                {
                    b.HasOne("Domain.JobProfile", "JobProfile")
                        .WithMany("Job")
                        .HasForeignKey("JobProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("JobProfile");
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
                    b.HasOne("Domain.Niche", "Niche")
                        .WithMany("JobProfiles")
                        .HasForeignKey("NicheId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Niche");
                });

            modelBuilder.Entity("Domain.JobProfile", b =>
                {
                    b.Navigation("Job");

                    b.Navigation("JobLinks");
                });

            modelBuilder.Entity("Domain.Niche", b =>
                {
                    b.Navigation("JobProfiles");
                });
#pragma warning restore 612, 618
        }
    }
}